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

export const POST = createRoute(zValidator("form", schema), (c) => {
  const { name } = c.req.valid("form");
  return c.redirect(`/form?name=${name}`);
});
