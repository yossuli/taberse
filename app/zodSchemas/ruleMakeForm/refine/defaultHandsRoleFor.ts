import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { defaultHandsSchema } from "../defaultHandsSchema";
import { template } from "./template";

export type DefaultHand = z.infer<typeof defaultHandsSchema>[number];

export const defaultHandsRoleFor = (
  defaultHands: DefaultHand[],
  roleNames: string[],
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
