import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { DefaultHands } from "../defaultHandsSchema";
import type { RoleName } from "../rolesSchema";
import { template } from "./template";

export const defaultHandsRoleFor = (
  defaultHands: DefaultHands,
  roleNames: RoleName[],
  ctx: z.RefinementCtx,
) => {
  const outliers = objArr2StrArr(defaultHands, "roleFor").filter(
    (roleFor) => !roleNames.includes(roleFor),
  );
  if (outliers.length) {
    ctx.addIssue({
      code: "custom",
      message: template.roles(roleNames, "defaultHands.roleFor", outliers),
    });
  }
};
