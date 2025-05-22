import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { defaultHandsSchema } from "../defaultHandsSchema";
import type { rolesSchema } from "../rolesSchema";
import { template } from "./template";

export type DefaultHand = z.infer<typeof defaultHandsSchema>[number];
export type Role = z.infer<typeof rolesSchema>[number];

export const defaultHandsRoleForInRoles = (
  defaultHands: DefaultHand[],
  roles: Role[],
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
