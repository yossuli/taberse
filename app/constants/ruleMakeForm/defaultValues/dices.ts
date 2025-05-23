import { dicesSchema } from "app/zodSchemas/ruleMakeForm/dices";

export const dices = [
  {
    name: "d6",
    range: {
      min: 1,
      max: 6,
      step: 1,
    },
  },
] as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.dice normal test", () => {
    const validate = dicesSchema.safeParse(dices);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
