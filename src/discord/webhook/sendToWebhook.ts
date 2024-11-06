import "jsr:@std/dotenv/load";
import axios from "npm:axios";
import { EmbedBuilder } from "npm:discord.js";

const webhookUrl = Deno.env.get("WEBHOOK_URL");

export const sendMessageToWebhook = async (fields: { name: string; value: string; inline: boolean }[], date: string): Promise<void> => {
    if (!webhookUrl) throw new Error("No webhook found");

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
        .then(async res => {
            const data = await res.data;
            console.log("Message sent successfully:", data);
        })
        .catch(err => {
            console.log(err);
            throw new Error(`Error: ${err}}`);
        });
};
