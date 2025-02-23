import { createRoute } from "honox/factory";

export const GET = createRoute((c) => {
  const id = c.req.param("id");
  return c.json({ id });
});
