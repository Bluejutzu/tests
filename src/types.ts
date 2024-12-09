import type { EmbedBuilder } from "discord.js";

export interface DiscordWebhookConfig {
    webhookUrl?: string;
    message?: string;
    embeds?: EmbedBuilder[];
}

export interface ResponseReturn {
    data: any;
    code: number;
    statusText?: string;
}

export interface RblxWebhookConfig {
    message: string | object;
    topic: string;
}

export interface MessagingServiceOptions {
    universeId: string;
    apiKey: string;
    baseUrl?: string;
}
