import type { DefaultHands, Roles } from "app/types/ruleMakeForm";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import { template } from "./template";

export const defaultHandsRoleForInRoles = (
  defaultHands: DefaultHands,
  roles: Roles,
  ctx: z.RefinementCtx,
) => {
  const roleNameList = objArr2StrArr(roles, "name");
  const outliers = objArr2StrArr(defaultHands, "roleFor").filter(
    (roleFor) => !roleNameList.includes(roleFor),
  );
  if (outliers.length) {
    ctx.addIssue({
      code: "custom",
      message: template.roles(roleNameList, "defaultHands.roleFor", outliers),
    });
    return false;
  }
  return true;
};
