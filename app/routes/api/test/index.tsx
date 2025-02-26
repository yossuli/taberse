import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import z from "zod";
export const GET = createRoute((c) => {
  const time = new Date().toISOString();
  return c.json({ time });
});

const schema = z.object({
  name: z.string(),
});

export const POST = createRoute(zValidator("json", schema), (c) => {
  const { name } = c.req.valid("json");
  return c.json({ name });
});
