// deno-lint-ignore-file
// deno-lint-ignore-file no-process-globals
import type { EmbedBuilder } from "discord.js";
import axios from "axios";

interface DiscordWebhookConfig {
    message?: string;
    embeds?: [EmbedBuilder];
}

interface ResponseReturn {
    data?: any;
    code?: any;
    statusText?: any;
}

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

/**
 * Simple function that utilizes Discords API to send a `POST Excecute Webhook` request.
 * @param config Parses arguments found in DiscordWebhookConfig
 * ```ts
 * import { useDiscordWebhook } from "..."
 *
 * const randomEmbed = new EmbedBuilder()
 * .setTitle("Hello world")
 * .setDescription("Utilizing the new function!")
 * .setColor("Random");
 *
 * const response = await useDiscordWebhook({message: randomEmbed, embeds: [randomEmbed]})
 * console.log(response)
 * ```
 */
export const useDiscordWebhook = async (config: DiscordWebhookConfig): Promise<ResponseReturn | void> => {
    if (!webhookUrl) return console.log(new Error("No webhook url found"));
    const { message, embeds } = config;

    const tbl: DiscordWebhookConfig = {};
    const res: ResponseReturn = {};

    if (message) tbl.message = message;
    if (embeds && embeds.length > 0) tbl.embeds = embeds;

    await axios
        .post(webhookUrl, tbl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r => {
            res.data = r.data;
            res.code = r.status;
            res.statusText = r.statusText;
        })
        .catch(err => {
            res.data = err.message;
            res.code = err.code;
        });

    return res;
};
