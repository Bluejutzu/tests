import "jsr:@std/dotenv/load";
import axios from "npm:axios";
import { EmbedBuilder } from "npm:discord.js";

const webhookUrl = Deno.env.get("WEBHOOK_URL");

export const sendMessageToWebhook = async (matcherResults: { [key: string]: boolean }): Promise<void> => {
    if (!webhookUrl) throw new Error("No webhook found");
    if (!Object.keys(matcherResults).length) throw new Error("Empty matcher results");

    // Create fields with diff formatting based on each matcher's result
    const fields = Object.entries(matcherResults).map(([matcherName, result]) => ({
        name: `**${matcherName}** Match`, // Bold matcher name
        value: `\`\`\`diff\n${result ? "+ true" : "- false"}\n\`\`\``,
        inline: false
    }));

    const embed = new EmbedBuilder()
        .setTitle("🔍 Matcher Test Results")
        .setColor(0x5865f2) // Neutral color for the overall embed
        .addFields(fields);

    try {
        const response = await axios.post(
            webhookUrl,
            { embeds: [embed] },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error(`Error: ${error}`);
    }
};
