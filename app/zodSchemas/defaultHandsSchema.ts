import { z } from "zod";

export const defaultHandsSchema = z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("random"),
        roleFor: z.string(),
        number: z.number().int().positive(),
        deckFrom: z.string(),
      }),
      z.object({
        type: z.literal("fixed"),
        roleFor: z.string(),
        deckFrom: z.string(),
        cards: z.array(z.object({ name: z.string(), num: z.number() })),
      }),
    ]),
  )