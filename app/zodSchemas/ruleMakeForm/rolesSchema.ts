import { z } from "zod";

export const rolesSchema = z
  .array(
    z.object({ name: z.string().min(1), num: z.number().int().positive() }),
  )
  .nonempty()
  .superRefine((roles, ctx) => {
    roles.forEach(({ name }, index) => {
      if (roles.filter((_, i) => i !== index).find((r) => r.name === name)) {
        ctx.addIssue({
          message: `Role "${name}" is duplicated`,
          code: z.ZodIssueCode.custom,
          path: [index, "name"],
        });
      }
    });
  });
