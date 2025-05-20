import { card } from "app/constants/ruleMakeForm/defaultValues/decks";
import { z } from "zod";
import { decksSchema } from "../decksSchema";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("nameは重複禁止", () => {
    const invalidDeck = [
      {
        name: "Deck1",
        list: [card, card],
        playableRoles: [{ roleName: "" }],
      },
    ];
    expect(
      JSON.parse(decksSchema.safeParse(invalidDeck).error?.message ?? ""),
    ).toStrictEqual([
      {
        message: 'Card "default" is duplicated',
        path: [0, "list", 0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Card "default" is duplicated',
        path: [0, "list", 1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
}
