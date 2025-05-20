import { decksSchema } from "app/zodSchemas/ruleMakeForm/decksSchema";

export const card = {
  name: "default",
  categoryName: "",
  num: 1,
  description: "",
} as const;

export const deck = {
  name: "default",
  list: [card],
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
