import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { streamSSE } from "hono/streaming";
import { createRoute } from "honox/factory";

const obj: Record<string, string> = {};

export const GET = createRoute(clerkMiddleware(), async (c) => {
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  return streamSSE(c, async (stream) => {
    let id = 0;
    c.header("Content-Encoding", "Identity");
    const user = getAuth(c)?.userId;
    if (!user) {
      return stream.writeSSE({ data: "Unauthorized", event: "error" });
    }
    while (id < 100) {
      const message = obj[user];
      if (message) {
        await stream.writeSSE({
          data: message,
          event: "find data that you put",
          id: String(id++),
        });
        delete obj[user];
      }
      await stream.sleep(1000);
    }
  });
});

export const PUT = createRoute(clerkMiddleware(), async (c) => {
  const user = getAuth(c)?.userId;
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  obj[user] = new Date().toISOString();
});
