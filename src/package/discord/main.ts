import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";
// ... other imports

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Add necessary intents

client.once("ready", () => {
    console.log("Discord bot is ready!");
});

// Example command handling (adapt as needed)
client.on("interactionCreate", async interaction => {
    // ... command logic
});

client.login(process.env.DISCORD_BOT_TOKEN); // Log in using your bot token
