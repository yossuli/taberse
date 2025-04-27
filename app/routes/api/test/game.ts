import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { RuleSchema } from "app/zodSchemas/ruleMakeForm";
import { createRoute } from "honox/factory";
import { getPrismaClient } from "../../../utils/getPrismsClient";

export const POST = createRoute(
  clerkMiddleware(),
  zValidator("json", RuleSchema),
  async (c) => {
    const auth = getAuth(c);
    const { name, ...rule } = c.req.valid("json");
    console.log("DB", c.env.DB);
    const prismaClient = await getPrismaClient(c.env.DB);
    if (!auth?.userId) {
      return c.redirect("/");
    }
    // const createdRule = await prismaClient.rule.create({
    //   data: {
    //     name,
    //     content: JSON.stringify(rule),
    //     ownerId: auth.userId,
    //   },
    // });
    console.log("rule", rule);
    return c.json(rule);
  },
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
