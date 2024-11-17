import axios from "axios";

export interface DiscordWebhookConfig {
    message?: string;
    embeds?: any[]; // You might want to replace 'any' with a more specific type if possible
}

export interface ResponseReturn {
    data: any;
    code: number;
    statusText?: string;
}

export class DiscordWebhook {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    async send(config: DiscordWebhookConfig): Promise<ResponseReturn | void> {
        if (!this.webhookUrl) {
            console.error(new Error("No webhook url found"));
            return;
        }

        const { message, embeds } = config;

        const requestBody: DiscordWebhookConfig = {};
        if (message) {
            requestBody.message = message;
        }

        if (embeds && embeds.length > 0) {
            requestBody.embeds = embeds;
        }

        try {
            const response = await axios.post(this.webhookUrl, requestBody, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return {
                data: response.data,
                code: response.status,
                statusText: response.statusText
            };
        } catch (error: any) {
            console.error("Error sending webhook:", error);
            return {
                data: error.message,
                code: error.code
            };
        }
    }
}
