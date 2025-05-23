import { playerSchema } from "app/zodSchemas/ruleMakeForm/player";

export const player = {
  min: 1,
  max: 1,
} as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.players normal test", () => {
    const validate = playerSchema.safeParse(player);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
