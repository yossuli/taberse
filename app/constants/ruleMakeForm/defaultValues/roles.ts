import { rolesSchema } from "app/zodSchemas/ruleMakeForm/rolesSchema";

export const roles = [{ name: "default" }] as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.roles normal test", () => {
    const validate = rolesSchema.safeParse(roles);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
