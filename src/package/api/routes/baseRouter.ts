import { Hono } from "hono";

import baseRoute from "./baseRoute";
import discordRoute from "./discord";
import robloxRoute from "./roblox";

const router = new Hono();

router.route("/discord", discordRoute);
router.route("/roblox", robloxRoute);
router.route("/", baseRoute);

export default router;
