import { RuleSchema } from "app/zodSchemas";

export const defaultValue = {};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue normal test", () => {
    const validate = RuleSchema.safeParse(defaultValue);
    expect(validate.success).toBe(true);
  });
}
