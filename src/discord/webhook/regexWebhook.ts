// deno-lint-ignore-file no-process-globals
import axios from "axios";
import { EmbedBuilder } from "discord.js";

const webhookUrl = process.env.WEBHOOK_URL;

export const regexWebhook = async (
    fields: { name: string; value: string; inline: boolean }[],
    date: string
): Promise<void> => {
    if (!webhookUrl) return console.log(new Error("No webhook url found"));

    const embed = new EmbedBuilder()
        .setTitle(`Regex Test Results - ${date}`)
        .setDescription("(**Red**: fail/false; **Green**: success/true)")
        .setColor(0x7289da)
        .addFields(fields);

    await axios
        .post(
            webhookUrl,
            { embeds: [embed] },
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .catch(err => {
            console.log(err);
            throw new Error(`Error: ${err}}`);
        });
};
