import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import { z } from "zod";
import { cardName, deckName } from "./decks";
import { roleName } from "./roles";

const defaultHand = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("random"),
    roleFor: roleName,
    number: z.number().int().positive(),
    deckFrom: deckName,
  }),
  z.object({
    type: z.literal("fixed"),
    roleFor: roleName,
    deckFrom: deckName,
    cards: z
      .array(z.object({ name: cardName, num: z.number() }))
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
]);
export const defaultHandsSchema = z
  .array(defaultHand)
  .superRefine((hands, ctx) => {
    const fixedHandsCards = hands
      .filter((h) => h.type === "fixed")
      .map((c) => objArr2StrArr(c.cards, "name"));
    fixedHandsCards
      .map(
        (fixedHandCards, i) =>
          findWithIndexResult(
            fixedHandsCards,
            (card, j) =>
              (i !== j || undefined) &&
              findWithIndexResult(fixedHandCards, (c) => card.includes(c)),
          ) ?? [],
      )
      .forEach(([_, _2, result], i) => {
        if (result) {
          const [duplicated, k] = result;
          ctx.addIssue({
            message: `Card "${duplicated}" is duplicated`,
            code: z.ZodIssueCode.custom,
            path: [i, "cards", k, "name"],
          });
        }
      });
  });

export type DefaultHands = z.infer<typeof defaultHandsSchema>;
