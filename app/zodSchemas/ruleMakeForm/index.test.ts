import { defaultValues } from "app/constants/ruleMakeForm/defaultValues";
import { RuleSchema } from ".";

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("ignoreRoles should be a subset of roles", () => {
    const okValues = {
      ...defaultValues,
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      turn: {
        ignoreRoles: [
          { roleName: "default" },
          { roleName: "test" },
          { roleName: "test2" },
          { roleName: "test3" },
        ],
      },
    };
    const validate = RuleSchema.safeParse(okValues);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });

  it("ignoreRoles should be a subset of roles", () => {
    const okValues = {
      ...defaultValues,
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      turn: {
        ignoreRoles: [
          { roleName: "default" },
          { roleName: "test" },
          { roleName: "test2" },
          { roleName: "test3" },
          { roleName: "test4" }, // this is not in roles
        ],
      },
    };
    const validate = RuleSchema.safeParse(okValues);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "turn.ignoreRoles (test4) are not in roles (default, test, test2, test3)",
    );
  });
}
