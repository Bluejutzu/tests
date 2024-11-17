import RobloxMessagingService from "../../package/discord/components/useMessagingService";
import { DiscordWebhook } from "../../package/discord/components/useWebhook";
import app from "../app";

const discordWebhook = new DiscordWebhook(process.env.DISCORD_WEBHOOK_URL);

const robloxMessagingService = new RobloxMessagingService({
    universeId: process.env.ROBLOX_UNIVERSE_ID,
    apiKey: process.env.ROBLOX_API_KEY
});

app.post("/discord", async c => {
    const body = await c.req.json();

    try {
        const response = await discordWebhook.send(body);
        return c.json({ response: response });
    } catch (error) {
        console.error("Error sending Discord webhook:", error);
        return c.json({ error: "Failed to send Discord webhook: " + (error as Error).message }, 500);
    }
});

app.post("/roblox", async c => {
    const body = await c.req.json();

    try {
        const response = await robloxMessagingService.sendMessage(body);
        return c.json({ messageId: response });
    } catch (error) {
        console.error("Error sending Roblox message:", error);
        return c.json({ error: "Failed to send Roblox message: " + error.message }, 500);
    }
});
