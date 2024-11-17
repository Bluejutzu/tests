import { EmbedBuilder } from "discord.js";

import RobloxMessagingService from "./components/useMessagingService";
import { DiscordWebhook } from "./components/useWebhook";

const obj = { user: "bluejutzu", reason: "lmao" };

const messagingService = new RobloxMessagingService({
    universeId: process.env.ROBLOX_UNIVERSE_ID,
    apiKey: process.env.ROBLOX_OPEN_CLOUD_API_KEY
});

messagingService.sendMessage({
    message: JSON.stringify(obj),
    topic: "announcement"
});

const _Embed = new EmbedBuilder().setTitle("Lmao").setDescription("Desc").setColor("Random");

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const webhook = new DiscordWebhook(webhookUrl);

const response = await webhook.send({
    message: "This is a test message",
    embeds: [_Embed]
});

console.log(response);
