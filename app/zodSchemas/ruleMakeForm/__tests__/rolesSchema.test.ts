import { roles } from "app/constants/ruleMakeForm/defaultValues/roles";
import { z } from "zod";
import { rolesSchema } from "../roles";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("nameは重複禁止", () => {
    const validRoles = [roles[0], roles[0]];
    expect(
      JSON.parse(rolesSchema.safeParse(validRoles).error?.message ?? ""),
    ).toStrictEqual([
      {
        message: 'Role "default" is duplicated',
        path: [0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Role "default" is duplicated',
        path: [1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
}
