import { Hono } from "hono";
import {userRouter} from "./routes/user";
import {bookRouter} from "./routes/blog";
import { accountrouter } from "./routes/account";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use(cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog",bookRouter);
app.route("/api/v1/accout",accountrouter);

export default app;

