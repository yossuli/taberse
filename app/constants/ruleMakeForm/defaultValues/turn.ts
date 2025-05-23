import { turnSchema } from "app/zodSchemas/ruleMakeForm/turn";

export const turn = {
  turnTimeLimit: { time: 10, type: "persistent" },
  ignoreRoles: [{ roleName: "default" }],
} as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.turn normal test", () => {
    const validate = turnSchema.safeParse(turn);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
