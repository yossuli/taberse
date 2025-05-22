import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { CardName, Decks } from "../decksSchema";
import type { DefaultHands } from "../defaultHandsSchema";
import { template } from "./template";

export const defaultHandsFixedCardsInDeckList = (
  fixedDefaultHands: DefaultHands,
  decks: Decks,
  ctx: z.RefinementCtx,
) => {
  const result = (a: CardName[], b: CardName[] | undefined) => {
    const diff = a.filter((x) => !b?.includes(x));
    return (!!diff?.length || undefined) && [diff, b];
  };

  return (
    callWithIfDefine(
      findWithIndexResult(fixedDefaultHands, (hand) => {
        if (hand.type !== "fixed") {
          return undefined;
        }
        const deckList = decks.find(
          (deck) => deck.name === hand.deckFrom,
        )?.list;
        if (!deckList) {
          return undefined;
        }
        const cardNames = objArr2StrArr(hand.cards, "name");
        const deckCardNames = objArr2StrArr(deckList, "name");
        return result(cardNames, deckCardNames);
      }),
      ([{ deckFrom }, index, [outliers, deckCardNames]]) => {
        if (outliers) {
          ctx.addIssue({
            code: "custom",
            message: template.deckList(
              `defaultHands[${index}].cards`,
              outliers,
              deckFrom,
              deckCardNames,
            ),
          });
          return false;
        }
        return true;
      },
    ) ?? true
  );
};
