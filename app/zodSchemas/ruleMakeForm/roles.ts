import { nameBranding } from "app/utils/nameBranding";
import { z } from "zod";

export const roleName = nameBranding("RoleName");
export const role = z.object({
  name: roleName,
  num: z.number().int().positive(),
});
export const rolesSchema = z
  .array(role)
  .nonempty()
  .superRefine((roles, ctx) => {
    roles.forEach(({ name }, index) => {
      if (roles.filter((_, i) => i !== index).find((r) => r.name === name)) {
        ctx.addIssue({
          message: `Role \"${name}\" is duplicated`,
          code: z.ZodIssueCode.custom,
          path: [index, "name"],
        });
      }
    });
  });
