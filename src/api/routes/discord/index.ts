import { Hono } from "hono";

import { DiscordWebhook } from "../../../discord/components/useWebhook";

const discordRoute = new Hono();

const discordWebhook = new DiscordWebhook(process.env.DISCORD_WEBHOOK_URL!);

// discordRoute.get("/", c => c.text("Hello World"));

discordRoute.post("/webhook", async c => {
    const body = await c.req.json();

    try {
        const response = await discordWebhook.send(body);
        return c.json({ response: response });
    } catch (error) {
        console.error("Error sending Discord webhook:", error);
        return c.json({ error: "Failed to send Discord webhook: " + (error as Error).message }, 500);
    }
});

export default discordRoute;
