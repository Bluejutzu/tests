import { RblxWebhookConfig } from "../../types/types";
import { responseReplies } from "./data/index.js";
import axios, { AxiosError } from "axios";
import "dotenv/config";

const universeId = process.env.ROBLOX_UNIVERSE_ID;
const apiKey = process.env.ROBLOX_OPEN_CLOUD_API_KEY;
const ROBLOX_API_BASE_URL = "https://apis.roblox.com/messaging-service/v1/universes";

export const useRblxMessagingService = async (config: RblxWebhookConfig) => {
    const { message, topic } = config;

    if (!universeId || !apiKey) {
        console.log(apiKey, universeId);
        return console.error("ROBLOX_UNIVERSE_ID or ROBLOX_OPEN_CLOUD_API_KEY is not set.");
    }

    const url = `${ROBLOX_API_BASE_URL}/${universeId}/topics/${topic}`;

    try {
        const response = await axios.post(
            url,
            { message: JSON.stringify(message) },
            {
                headers: {
                    "x-api-key": apiKey,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Message sent successfully:", response.data);
    } catch (err) {
        const error = err as AxiosError;
        handleMessagingError(error);
    }
};

function handleMessagingError(error: AxiosError) {
    const responseCode = error.response?.status;
    const responseData = error.response?.data;

    let errorMessage = `An unknown issue occured.`

    if (responseCode && responseReplies[responseCode]) {
        const reply = responseReplies[responseCode];
        errorMessage =
            typeof reply === "string"
                ? reply
                : typeof reply === "object" && typeof responseData === "string"
                ? reply[responseData] || reply.default
                : errorMessage;
    }

    console.error(errorMessage + `${responseCode}, ${responseData}`);
}
