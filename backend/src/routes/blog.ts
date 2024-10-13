import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

bookRouter.use(async (c, next) => {
	const jwt = c.req.header("Authorization");
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(" ")[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set("userId", payload.id as string);
	await next();
});

bookRouter.post("/", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
			published: body.published,
		},
	});
	return c.json({
		id: post.id,
	});
});

bookRouter.put("/", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId,
		},
		data: {
			title: body.title,
			content: body.content,
		},
	});

	return c.text("updated post");
});

bookRouter.get("/posts", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const posts = await prisma.post.findMany({
		where: {
			published: true,
		},
		include: {

			author: { select: { name: true } },
		},
	});
	return c.json(posts);
});

bookRouter.post("/like", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	console.log("Request body:", body);

	if (!body.postId) {
		return c.json({ error: "postId is required" }, 400);
	}

	try {
		await prisma.like.create({
			data: {
				postId: body.postId,
				userId: userId,
			},
		});
		return c.text("liked");
	} catch (error) {
		console.error("Error creating like:", error);
		return c.json({ error: "Internal Server Error" }, 500);
	} finally {
		await prisma.$disconnect();
	}
});

bookRouter.post("/dislike", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.dislike.create({
		data: {
			postId: body.postId,
			userId: userId,
		},
	});
	return c.text("disliked");
});

bookRouter.post("/comment", async (c) => {
	const userId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	await prisma.comment.create({
		data: {
			postId: body.postId,
			userId: userId,
			content: body.content,
		},
	});
	return c.text("commented");
});

bookRouter.post("/numlikes", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json()
	const postId = body.postId;
	console.log(postId);
	const likes = await prisma.like.count({
		where: {
			postId: postId,
		},
	});
	return c.json({ "likes":likes });
});

bookRouter.get("/numdislikes", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const postId = c.req.param("postId");
	const dislikes = await prisma.dislike.count({
		where: {
			postId: postId,
		},
	});
	return c.json({ dislikes });
});

bookRouter.get("/comments", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const postId = c.req.param("postId");
	const comments = await prisma.comment.findMany({
		where: {
			postId: postId,
		},
	});
	return c.json(comments);
});

bookRouter.get("/myblogs", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const userid = c.get("userId");
	const blogs = await prisma.post.findMany({
		where: {
			authorId: userid
		},
		include :{
			author : true,
		}
	})

	return c.json({
		posts: blogs
	});
})

bookRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	console.log(id);
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const post = await prisma.post.findUnique({
		where: {
			id: id,
		},
		select: {
			title: true,
			content: true,
			published: true,
			author: { select: { name: true } }
		}
	});

	console.log(post);

	return c.json(post);
});

