import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { customHeader, logger, timing } from "./middleware";
import router from "./routes/baseRouter";

const app = new Hono();
app.get("/", c => c.text("Hello World"));
app.route("/api", router);
app.use("/api/*", logger);
app.use(timing);
app.use("/protected", customHeader);

app.get("/api/hello", c => c.text("Hello from API!"));
app.get("/protected/resource", c => c.text("Protected resource"));

app.get("/", c => c.text("Hello World!"));

serve({
    fetch: app.fetch,
    port: 3000
});

export default app;
