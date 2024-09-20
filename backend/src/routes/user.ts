import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(8),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(8)
});

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.use("/me", async (c, next) => {
  const authheader = c.req.header("Authorization");
  if (!authheader) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  console.log(authheader);
  const token = authheader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set("userId", payload.id as string);
    return next();
  } catch (e) {
    c.status(401);
    return c.json({ error: "Unauthorized in authheader" });
  }
});

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      name: true,
      id: true,
      posts: true
    }
  });

  return c.json(user);
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const validated = signupSchema.parse(body);

  if (validated === null) {
    c.status(400);
    return c.json({ error: "Invalid data" });
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const validated = signinSchema.parse(body);

  if (validated === null) {
    c.status(400);
    return c.json({ error: "Invalid data" });
  }
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: body.email,
          password: body.password,
        },
        {
          name: body.email,
          password: body.password,
        },
      ],
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
