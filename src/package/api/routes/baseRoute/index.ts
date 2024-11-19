import { Hono } from "hono";

const baseRoute = new Hono();

baseRoute.get("/", c => c.text("Hello World"));

export default baseRoute;
