import { useDiscordWebhook } from "../hooks/useWebhook.ts";
import { EmbedBuilder } from "discord.js";

const iEmbed = new EmbedBuilder().setTitle("Lmao").setDescription("Desc").setColor("Random");

const r = await useDiscordWebhook({ message: "lmao", embeds: [iEmbed] });
console.log(r);
