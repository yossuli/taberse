import { defaultHandsSchema } from "app/zodSchemas/ruleMakeForm/defaultHandsSchema";

export const defaultHandRandom = {
  type: "random",
  roleFor: "default",
  number: 1,
  deckFrom: "default",
} as const;
export const defaultHandFixed = {
  type: "fixed",
  roleFor: "default",
  deckFrom: "default",
  cards: [
    {
      name: "default",
      num: 1,
    },
  ],
} as const;

export const defaultHands = [defaultHandRandom, defaultHandFixed] as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.defaultHands normal test", () => {
    const validate = defaultHandsSchema.safeParse(defaultHands);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
