import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { decksSchema } from "../decksSchema";
import type { defaultHandsSchema } from "../defaultHandsSchema";
import { template } from "./template";

export type DefaultHand = z.infer<typeof defaultHandsSchema>[number];
export type Decks = z.infer<typeof decksSchema>;

export const defaultHandsDeckFromInDecks = (
  defaultHands: DefaultHand[],
  decks: Decks,
  deckNames: string[],
  ctx: z.RefinementCtx,
) => {
  const deckNameList = objArr2StrArr(decks, "name");
  const outliers = objArr2StrArr(defaultHands, "deckFrom").filter(
    (deckFrom) => !!deckFrom && !deckNameList.includes(deckFrom),
  );
  if (outliers.length) {
    ctx.addIssue({
      code: "custom",
      message: template.decks(deckNames, "defaultHands.deckFrom", outliers),
    });
    return false;
  }
  return true;
};
