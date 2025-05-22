import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { DeckName } from "../decksSchema";
import type { DefaultHands } from "../defaultHandsSchema";
import type { Decks } from "./deckPlayableRoles";
import { template } from "./template";

export const defaultHandsDeckFromInDecks = (
  defaultHands: DefaultHands,
  decks: Decks,
  deckNames: DeckName[],
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
