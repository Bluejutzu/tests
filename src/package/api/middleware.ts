import { Context, Next } from "hono";

const logger = async (c: Context, next: Next) => {
    console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url}`);
    await next();
};

const auth = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization");
    if (!token || token !== "your_secret_token") {
        return c.text("Unauthorized", 401);
    }
    await next();
};

const timing = async (c: Context, next: Next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    const elapsed = end - start;
    console.log(`Request took ${elapsed}ms`);
};

const customHeader = async (c: Context, next: Next) => {
    c.res.headers.append("X-Custom-Header", "Hono-Middleware-Rocks!");
    await next();
};

export { auth, customHeader, logger, timing };
