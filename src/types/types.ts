import { EmbedBuilder } from "discord.js";

export interface DiscordWebhookConfig {
    message?: string;
    embeds?: [EmbedBuilder];
}

export interface RegexTestConfig {
    testWords?: string[];
    useDefaultMatchers?: boolean;
    logToFile?: boolean;
    useWebhook?: boolean;
    userMatchers?: { [key: string]: RegExp[] };
}

export interface RblxWebhookConfig {
    message: string | { [key: string]: string }, 
    topic: string
    secure?: boolean
}

export interface ResponseReturn {
    data?: any;
    code?: any;
    statusText?: any;
}
