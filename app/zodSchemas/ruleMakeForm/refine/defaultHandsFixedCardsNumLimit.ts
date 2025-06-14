import assert from "node:assert";
import type { DeckName, Decks } from "app/types/ruleMakeForm";
import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { findWithIndexResult } from "app/utils/findWithIndex";
import type { z } from "zod";
import type { DefaultHands } from "../defaultHands";
import type { RoleName, Roles } from "../roles";

export const defaultHandsFixedCardsNumLimit = (
  fixedDefaultHands: DefaultHands,
  decks: Decks,
  roles: Roles,
  ctx: z.RefinementCtx,
) => {
  type Result = (
    name: string,
    num: number,
    deckFrom: DeckName,
    roleFor: RoleName,
  ) =>
    | [
        { name: string; num: number },
        string,
        number,
        { roleFor: RoleName; roleNum: number },
      ]
    | undefined;

  const result: Result = (name, num, deckFrom, roleFor) => {
    const deck = decks.find((d) => d.name === deckFrom);
    const roleNum = roles.find((r) => r.name === roleFor)?.num;
    const cardLimit = deck?.list.find((c) => c.name === name)?.num;
    assert(roleNum, "undefinedならすでにエラーなのでこの検証は行われないはず");
    assert(cardLimit, "同上");

    if (cardLimit >= num * roleNum) {
      return undefined;
    }
    return [{ name, num }, deckFrom, cardLimit, { roleFor, roleNum }];
  };
  callWithIfDefine(
    findWithIndexResult(fixedDefaultHands, (hand) => {
      if (hand.type !== "fixed") {
        return undefined;
      }
      return findWithIndexResult(hand.cards, (card) =>
        result(card.name, card.num, hand.deckFrom, hand.roleFor),
      );
    }),
    ([_1, i, [_2, j, result]]) => {
      const [{ name, num }, deckName, cardLimit, { roleFor, roleNum }] = result;
      ctx.addIssue({
        code: "custom",
        message: `defaultHands[${i}].cards[${j}].name (${name}) is ${deckName}: ${name} (${cardLimit}) < card: ${name} (${num}) * ${roleFor} (${roleNum})`,
      });
    },
  );
};
