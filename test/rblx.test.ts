import { beforeAll, describe, expect, it } from "vitest";
import RobloxMessagingService from "../src/discord/components/useMessagingService";
import "dotenv/config";

const obj = { user: "bluejutzu", reason: "lmao" };

const messagingService = new RobloxMessagingService({
    universeId: process.env.ROBLOX_UNIVERSE_ID!,
    apiKey: process.env.ROBLOX_OPEN_CLOUD_API_KEY!
});

describe("Roblox Messaging", () => {
    let response: any;

    beforeAll(async () => {
        response = await messagingService.sendMessage({
            message: "fuck",
            topic: "announcement"
        });
    });

    it("should send a message", () => expect(response).toBeDefined());
});
