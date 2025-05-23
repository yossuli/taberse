import { decksSchema } from "app/zodSchemas/ruleMakeForm/decks";

export const card = {
  name: "default",
  categoryName: "",
  num: 1,
  description: "",
} as const;

const card2 = {
  ...card,
  name: "default 2",
} as const;

export const deck = {
  name: "default",
  list: [card, card2],
  playableRoles: [{ roleName: "default" }],
} as const;

export const decks = [deck] as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.decks normal test", () => {
    const validate = decksSchema.safeParse(decks);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
