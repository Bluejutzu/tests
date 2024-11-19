import { Hono } from "hono";

import RobloxMessagingService from "../../../package/discord/components/useMessagingService";

const robloxRoute = new Hono();

const robloxMessagingService = new RobloxMessagingService({
    universeId: process.env.ROBLOX_UNIVERSE_ID,
    apiKey: process.env.ROBLOX_API_KEY
});

robloxRoute.get("/", async c => {
    return c.text("/api/roblox api route");
});

robloxRoute.post("/", async c => {
    const body = await c.req.json();

    try {
        const response = await robloxMessagingService.sendMessage(body);
        return c.json({ messageId: response });
    } catch (error) {
        console.error("Error sending Roblox message:", error);
        return c.json({ error: "Failed to send Roblox message: " + error.message }, 500);
    }
});

export default robloxRoute;
