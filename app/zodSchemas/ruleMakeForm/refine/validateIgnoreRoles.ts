import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { turnSchema } from "../turnSchema";
import { template } from "./template";

export type Turn = z.infer<typeof turnSchema>;

export const ignoreRoles = (
  turn: Turn | undefined,
  roleNames: string[],
  ctx: z.RefinementCtx,
) => {
  if (!turn) {
    return;
  }
  const outliers = objArr2StrArr(turn.ignoreRoles, "roleName").filter(
    (roleName) => !roleNames.includes(roleName),
  );
  if (outliers.length) {
    ctx.addIssue({
      code: "custom",
      message: template.roles(roleNames, "turn.ignoreRoles", outliers),
    });
  }
};
