import { turn } from "app/constants/ruleMakeForm/defaultValues/turn";
import { z } from "zod";
import { turnSchema } from "../turn";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("nameは重複禁止", () => {
    const validTurn = {
      ...turn,
      ignoreRoles: [turn.ignoreRoles[0], turn.ignoreRoles[0]],
    };
    expect(
      JSON.parse(turnSchema.safeParse(validTurn).error?.message ?? ""),
    ).toStrictEqual([
      {
        message: 'Role "default" is duplicated',
        path: ["ignoreRoles", 0, "roleName"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Role "default" is duplicated',
        path: ["ignoreRoles", 1, "roleName"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
}
