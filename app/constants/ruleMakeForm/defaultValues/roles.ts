import { rolesSchema } from "app/zodSchemas/ruleMakeForm/roles";

export const role = { name: "default", num: 1 } as const;
export const roles = [role] as const;

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
