import RobloxMessagingService from "../src/discord/components/useMessagingService";
const obj = { user: "bluejutzu", reason: "lmao" };

const messagingService = new RobloxMessagingService({
    universeId: process.env.ROBLOX_UNIVERSE_ID!,
    apiKey: process.env.ROBLOX_OPEN_CLOUD_API_KEY!
});

messagingService.sendMessage({
    message: JSON.stringify(obj),
    topic: "announcement"
});
