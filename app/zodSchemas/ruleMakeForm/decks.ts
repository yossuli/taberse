import { nameBranding } from "app/utils/nameBranding";
import { z } from "zod";
import { roleName } from "./roles";

export const deckName = nameBranding("DeckName");
export const deckListCategoryName = nameBranding(
  "DeckListCategoryName",
).optional();

export const cardName = nameBranding("CardName");

export const card = z.object({
  name: cardName,
  categoryName: deckListCategoryName,
  num: z.number().int().positive(),
  description: z.string(),
});
export const deckList = z.array(card);

export const deck = z.object({
  name: deckName,
  list: deckList.superRefine((list, ctx) => {
    list.forEach(({ name }, index) => {
      if (list.filter((_, i) => i !== index).find((l) => l.name === name)) {
        ctx.addIssue({
          message: `Card "${name}" is duplicated`,
          code: z.ZodIssueCode.custom,
          path: [index, "name"],
        });
      }
    });
  }),
  playableRoles: z.array(z.object({ roleName })),
});
export const decksSchema = z.array(deck);
