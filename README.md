# bluejutzu-package

Lowkey useless (for now!). This package provides a foundation for building a Discord bot and related API functionality using Hono, TypeScript, and other useful tools.

## Getting Started

1. **Installation:**

    ```bash
    npm install bluejutzu-package
    // or
    pnpm install bluejutzu-package
    // or
    yarn add bluejutzu-package
    ```

2. Configuration:
    - Create a `.env` file in the root of your project and set any necessary environment variables. (See `.env.example` for guidance if provided). You will almost certainly need a DISCORD_BOT_TOKEN at minimum if using the Discord functionality.
    - Adapt the example code to fit your specific needs.

## Usage

This package is structured to separate API routes and Discord bot functionality.

## API (Hono)

The API is built using the Hono framework. The entry point is `src/package/api/app.ts`.

Example (src/package/api/app.ts):

```ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import router from "./routes/baseRouter"; // Import the main router

const app = new Hono();

app.get("/", c => c.text("Hello World!"));

// Mount the main router (all API routes will be under /api)
app.route("/api", router);

serve({
    fetch: app.fetch,
    port: 3000 // Configure your port
});

export default app;
```

-   API routes are defined in `src/package/api/routes`.
-   Middleware can be applied to specific routes or globally within `app.ts`.

## Discord Bot

The Discord bot functionality is found in `src/package/discord/main.ts`.

**Example (src/package/discord/main.ts):**

```ts
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config"; // Loads environment variables from .env
// ... other imports

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Add necessary intents

client.once("ready", () => {
    console.log("Discord bot is ready!");
});

// Example command handling (adapt as needed)
client.on("interactionCreate", async interaction => {
    // ... command logic
});

client.login(process.env.DISCORD_BOT_TOKEN); // Log in using your bot token.
```

-   You'll need to add the necessary GatewayIntentBits for your bot's functionality.
-   The client.on('interactionCreate', ...) event handles slash commands. You'll need to register your commands with Discord separately (this is often done in a separate setup script).

## Development

-   **`npm run dev`**: Starts the Hono development server (usually on port 3000, or as configured).
-   **`npm run build`**: Compiles the TypeScript code to JavaScript (output in dist).
-   **`npm run watch`**: Watches for code changes and recompiles.
-   **`npm run lint:f`**: Runs Prettier and ESLint to format and lint the code.

## License

[ISC](./LICENSE)

This README provides a good starting point. You might want to include more details on:

-   Specific examples of API routes defined in `src/package/api/routes`.
-   Details on any included middleware.
-   Instructions for setting up and registering Discord slash commands.
-   A `.env.example` file to show users which environment variables are needed.

This improved README provides more context, explains the structure of the project, and gives clear instructions on development, usage, and contribution. It also includes the very important note about requiring a `.env` file for secrets. Remember to replace the example snippets with real code excerpts from your project.
