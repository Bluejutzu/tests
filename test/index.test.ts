import { beforeAll, describe, expect, it } from "vitest";
import { EmbedBuilder } from "discord.js";

import { DiscordWebhook } from "../src/discord/components/useWebhook";

const _Embed = new EmbedBuilder().setTitle("Lmao").setDescription("Desc").setColor("Random");

const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
const webhook = new DiscordWebhook(webhookUrl);

describe("Webhook", () => {
  let response: any;

  beforeAll(async () => {
    response = await webhook.send({
      message: "This is a test message",
      embeds: [_Embed]
    });
  });

  it("should send a message", () => expect(response).toBeDefined());
});
