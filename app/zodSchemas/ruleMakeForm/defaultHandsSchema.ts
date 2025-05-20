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
      cards: z
        .array(z.object({ name: z.string(), num: z.number() }))
        .superRefine((cards, ctx) => {
          cards.forEach(({ name }, index) => {
            if (
              cards.filter((_, i) => i !== index).find((c) => c.name === name)
            ) {
              ctx.addIssue({
                message: `Card "${name}" is duplicated`,
                code: z.ZodIssueCode.custom,
                path: [index, "name"],
              });
            }
          });
        }),
    }),
  ]),
);
