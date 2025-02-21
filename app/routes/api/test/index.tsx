import { createRoute } from "honox/factory";
export default createRoute((c) => {
  const time = new Date().toISOString();
  return c.json({ time });
});
