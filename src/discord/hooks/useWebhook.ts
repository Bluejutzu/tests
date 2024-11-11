// deno-lint-ignore-file
// deno-lint-ignore-file no-process-globals

import { DiscordWebhookConfig, ResponseReturn } from "@/types/types.js";
import axios from "axios";

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

/**
 * Sends a message to a Discord webhook.
 *
 * This function utilizes Discord's API to send a POST request to the specified webhook URL.
 * It can send a simple message or embed messages.
 *
 * @param {DiscordWebhookConfig} config - The configuration for the webhook message.
 * @param {string} [config.message] - The message content to send.
 * @param {EmbedBuilder[]} [config.embeds] - An array of EmbedBuilder objects to send as embeds.
 *
 * @returns {Promise<ResponseReturn | void>} A promise that resolves with the response from the Discord API,
 * or `void` if no webhook URL is found.
 *
 * @example
 * ```ts
 * import { useDiscordWebhook } from "..."
 * import { EmbedBuilder } from "discord.js"; // Assuming you're using discord.js
 *
 *  const embed = new EmbedBuilder()
 *  .setTitle("Hello world")
 *  .setDescription("Utilizing the new function!")
 *  .setColor("Random");

 * const response = await useDiscordWebhook({
 * message: "This is a test message", embeds: [embed] 
 * });
 * console.log(response);
 * ```
 */
export const useDiscordWebhook = async (config: DiscordWebhookConfig): Promise<ResponseReturn | void> => {
    if (!webhookUrl) {
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
        const response = await axios.post(webhookUrl, requestBody, {
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
        // It's better to re-throw the error or handle it more gracefully here
        // rather than just setting data, code, and statusText in the res object.
        console.error("Error sending webhook:", error);
        return {
            data: error.message,
            code: error.code
        };
    }
};
