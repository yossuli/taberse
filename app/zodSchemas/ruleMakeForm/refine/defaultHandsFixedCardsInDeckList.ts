import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { findWithIndexResult } from "app/utils/findWithIndex";
import type { z } from "zod";
import type { decksSchema } from "../decksSchema";
import type { defaultHandsSchema } from "../defaultHandsSchema";
import { template } from "./template";

export type DefaultHand = z.infer<typeof defaultHandsSchema>[number];
export type Deck = z.infer<typeof decksSchema>[number];

export const defaultHandsFixedCardsInDeckList = (
  fixedDefaultHands: DefaultHand[],
  decks: Deck[],
  ctx: z.RefinementCtx,
) => {
  const result = (
    a: string[],
    b: string[] | undefined,
  ): [string[], string[] | undefined] | undefined => {
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
        const cardNames = hand.cards.map((c) => c.name);
        const deckCardNames = deckList.map((c) => c.name);
        return result(cardNames, deckCardNames);
      }),
      ([{ deckFrom }, index, [outliers, deckList]]) => {
        if (outliers) {
          ctx.addIssue({
            code: "custom",
            message: template.deckList(
              `defaultHands[${index}].cards`,
              outliers,
              deckFrom,
              deckList.join(", "),
            ),
          });
          return false;
        }
        return true;
      },
    ) ?? true
  );
};
