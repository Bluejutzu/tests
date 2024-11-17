import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
app.get("/", c => c.text("Hello world"));

serve({
    fetch: app.fetch,
    port: 3000
});

export default app;
