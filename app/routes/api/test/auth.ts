import { createRoute } from "honox/factory";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export default createRoute(clerkMiddleware(), (c) => {
  const auth = getAuth(c);
  return c.json({ auth });
});
