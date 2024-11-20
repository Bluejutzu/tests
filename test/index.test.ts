import { EmbedBuilder } from "discord.js";

import { DiscordWebhook } from "../src/discord/components/useWebhook";

const _Embed = new EmbedBuilder().setTitle("Lmao").setDescription("Desc").setColor("Random");

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const webhook = new DiscordWebhook(webhookUrl);

const response = await webhook.send({
    message: "This is a test message",
    embeds: [_Embed]
});

console.log(response);
