import { bearerAuth } from "hono/bearer-auth";
import { Hono } from "hono";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use(bearerAuth({token}));