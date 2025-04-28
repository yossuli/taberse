import { defaultHandsSchema } from "app/zodSchemas/ruleMakeForm/defaultHandsSchema";
import type { z } from "zod";

export const defaultHands: z.infer<typeof defaultHandsSchema> = [
  {
    type: "random",
    roleFor: "default",
    number: 1,
    deckFrom: "deck",
  },
];

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
