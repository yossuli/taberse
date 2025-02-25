import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { getPrismaClient } from "../../../utils/getPrismsClient";

const schema = z.object({
  title: z.string(),
  passPhrase: z.string(),
});

export const POST = createRoute(
  clerkMiddleware(),
  zValidator("form", schema),
  async (c) => {
    const auth = getAuth(c);
    const { title, passPhrase } = c.req.valid("form");
    console.log("DB", c.env.DB);
    const prismaClient = await getPrismaClient(c.env.DB);
    if (!auth?.userId) return c.redirect("/");
    const game = await prismaClient.game.create({
      data: {
        title,
        passPhrase,
        createBy: auth.userId,
        rule: {},
      },
    });
    console.log("game", game);
    return c.redirect("/");
  }
);

export const GET = createRoute(async (c) => {
  const prismaClient = await getPrismaClient(c.env.DB);
  const games = await prismaClient.game.findMany();
  return c.json({
    games: games.map((game) => ({
      title: game.title,
      rule: game.rule,
    })),
  });
});
