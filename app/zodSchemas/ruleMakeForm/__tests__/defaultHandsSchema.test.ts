import { card } from "app/constants/ruleMakeForm/defaultValues/decks";
import { defaultHandFixed } from "app/constants/ruleMakeForm/defaultValues/defaultHands";
import { z } from "zod";
import { defaultHandsSchema } from "../defaultHandsSchema";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("固定の初期手札のcards[number].nameは重複禁止(同じdefaultHand内)", () => {
    const validHand = [{ ...defaultHandFixed, cards: [card, card] }];
    expect(
      JSON.parse(defaultHandsSchema.safeParse(validHand).error?.message ?? ""),
    ).toStrictEqual([
      {
        message: 'Card "default" is duplicated',
        path: [0, "cards", 0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Card "default" is duplicated',
        path: [0, "cards", 1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
  it("固定の初期手札のcards[number].nameは重複禁止(異なるdefaultHand間)", () => {
    const validHand = [
      { ...defaultHandFixed, cards: [{ ...card, name: "test" }] },
      {
        ...defaultHandFixed,
        cards: [
          { ...card, name: "test2" },
          { ...card, name: "test" },
        ],
      },
    ];
    expect(
      JSON.parse(defaultHandsSchema.safeParse(validHand).error?.message ?? ""),
    ).toStrictEqual([
      {
        message: 'Card "test" is duplicated',
        path: [0, "cards", 0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Card "test" is duplicated',
        path: [1, "cards", 1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
}
