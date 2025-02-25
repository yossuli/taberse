import {} from "hono";

declare module "hono" {
  // @ts-ignore
  interface Env {
    Variables: {};
    Bindings: {
      DB: D1Database;
    };
  }
}
