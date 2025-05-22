import { z } from "zod";
import { roleName } from "./rolesSchema";

export const deckName = z.string().min(1).brand("DeckName");
export const deckListCategoryName = z
  .string()
  .optional()
  .brand("DeckListCategoryName");

export const cardName = z.string().min(1).brand("CardName");

const card = z.object({
  name: cardName,
  categoryName: deckListCategoryName,
  num: z.number().int().positive(),
  description: z.string(),
});
const deckList = z.array(card);

const deck = z.object({
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

export type Decks = z.infer<typeof decksSchema>;
export type DeckName = z.infer<typeof deckName>;
export type CardName = z.infer<typeof cardName>;
export type DeckListCategoryName = z.infer<typeof deckListCategoryName>;
export type DeckList = z.infer<typeof deckList>;
export type Deck = z.infer<typeof deck>;
