import "jsr:@std/dotenv/load";
import axios from "npm:axios";

const webhookUrl = Deno.env.get("WEBHOOK_URL") as string;

export const sendMessageToWebhook = async (message: string[]): Promise<void> => {
    await axios
        .post(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: message })
        })
        .then(async res => {
            const data = await res.data;
            console.log("Message sent successfully:", data);
        })
        .catch(err => {
            throw new Error(`Error: ${err}}`);
        });
};
