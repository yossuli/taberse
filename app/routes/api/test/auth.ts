import { createRoute } from "honox/factory";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { hc } from "hono/client";
import {
  BlankEnv,
  BlankInput,
  BlankSchema,
  ExtractInput,
  H,
  HandlerResponse,
  ToSchema,
} from "hono/types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
const schema = z
  .object({
    name: z.string(),
  })
  .optional();

export const GET = createRoute(
  clerkMiddleware(),
  zValidator("query", schema),
  (c) => {
    const auth = getAuth(c);
    return c.json({ auth });
  }
);

const app = new Hono();

const route = app.get(
  "/",
  clerkMiddleware(),
  zValidator("query", schema),
  (c) => {
    const auth = getAuth(c);
    return c.json({ auth });
  }
);

type GETType = typeof GET;

type App = typeof route;

type PickIN<T extends any[]> =
  T["1"] extends H<any, any, infer R, any> ? R : never;
type PickOUT<T extends any[]> =
  T["0"] extends H<any, any, any, infer R> ? R : never;

type GETS = ToSchema<
  "GET",
  "/api/test/auth",
  ExtractInput<PickIN<GETType>>,
  PickOUT<GETType>
>;

const client = hc<App & Hono<BlankEnv, GETS, "/">>("");

client.index.$get({}).then((res) => res.json());

client.api.test.auth
  .$get({})
  .then((res) => res.json())
  .then((data) => console.log(data));
