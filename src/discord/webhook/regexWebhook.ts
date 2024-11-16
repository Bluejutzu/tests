import axios from "axios";
import { EmbedBuilder } from "discord.js";

const webhookUrl = process.env.WEBHOOK_URL;

export const regexWebhook = async (
    fields: { name: string; value: string; inline: boolean }[],
    date: string
): Promise<void> => {
    if (!webhookUrl) {
        console.error(new Error("No webhook url found " + webhookUrl));
        return;
    }
    console.group("regexWebhook")
    console.log("Starting")
    const embed = new EmbedBuilder()
        .setTitle(`Regex Test Results - ${date}`)
        .setDescription("(**Red**: fail/false; **Green**: success/true)")
        .setColor(0x7289da)
        .addFields(fields);

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        await axios.post(webhookUrl, { embeds: [embed] }, requestOptions);
        console.log("Ended")
        console.groupEnd()
    } catch (error) {
        console.error(error);
        throw new Error(`Error sending webhook: ${error}`);
    }
};
