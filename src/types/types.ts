import { EmbedBuilder } from "discord.js";

export interface DiscordWebhookConfig {
    message?: string;
    embeds?: [EmbedBuilder];
}

export interface ResponseReturn {
    data?: any;
    code?: any;
    statusText?: any;
}
