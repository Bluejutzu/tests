export interface DiscordWebhookConfig {
    message?: string;
    embeds?: any[]; // You might want to replace 'any' with a more specific type if possible
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
