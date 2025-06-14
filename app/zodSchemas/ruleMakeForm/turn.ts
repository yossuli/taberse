import { z } from "zod";
import { roleName } from "./roles";

export const turnSchema = z.object({
  ignoreRoles: z
    .array(z.object({ roleName }))
    .superRefine((ignoreRoles, ctx) => {
      ignoreRoles.forEach((role, index) => {
        if (
          ignoreRoles
            .filter((_, i) => i !== index)
            .find((r) => r.roleName === role.roleName)
        ) {
          ctx.addIssue({
            message: `Role "${role.roleName}" is duplicated`,
            code: z.ZodIssueCode.custom,
            path: [index, "roleName"],
          });
        }
      });
    }),
  turnTimeLimit: z
    .object({
      time: z.number().positive(),
      type: z.enum(["persistent", "reset"]),
    })
    .optional(),
});

