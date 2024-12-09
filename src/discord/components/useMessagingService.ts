import axios, { AxiosError } from "axios";

import { MessagingServiceOptions, RblxWebhookConfig } from "../../types";

export class RobloxMessagingService {
    private universeId: string;
    private apiKey: string;
    private baseUrl: string;

    constructor(options: MessagingServiceOptions) {
        this.universeId = options.universeId;
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl || "https://apis.roblox.com/messaging-service/v1/universes";
    }
    public async sendMessage(config: RblxWebhookConfig): Promise<number | undefined> {
        const { message, topic } = config;

        const url = `${this.baseUrl}/${this.universeId}/topics/${topic}`;

        try {
            const response = await axios.post(
                url,
                { message: typeof message === "string" ? message : JSON.stringify(message) },
                {
                    headers: {
                        "x-api-key": this.apiKey,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Message sent successfully:", response.status);
            return response.status;
        } catch (error) {
            this.handleMessagingError(error as AxiosError);
            return undefined;
        }
    }

    private handleMessagingError(error: AxiosError): void {
        const responseCode = error.response?.status;
        const responseData = error.response?.data;

        let errorMessage = "An unknown issue occurred.";

        const responseReplies: Record<number, string | { [key: string]: string; default: string }> = {
            200: "Message successfully sent!",
            400: {
                default: "Error: An unknown issue has occurred.",
                "requestMessage cannot be longer than 1024 characters. (Parameter 'requestMessage')":
                    "Error: The request message cannot be longer then 1024 characters long."
            },
            401: "Error: API key not valid for operation, user does not have authorization",
            403: "Error: Publish is not allowed on universe.",
            500: "Error: Server internal error / Unknown error."
        };

        if (responseCode && responseReplies[responseCode]) {
            const reply = responseReplies[responseCode];
            errorMessage =
                typeof reply === "string"
                    ? reply
                    : typeof reply === "object" && typeof responseData === "string"
                      ? reply[responseData] || reply.default
                      : errorMessage;
        }

        console.error(`${errorMessage} (Response Code: ${responseCode}, Response Data: ${responseData})`);
    }
}

export default RobloxMessagingService;
