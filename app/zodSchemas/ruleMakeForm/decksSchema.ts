import { z } from "zod";

export const decksSchema = z.array(
    z.object({
      name: z.string(),
      list: z
        .array(
          z.object({
            name: z.string().min(1),
            categoryName: z.string().optional(),
            num: z.number().int().positive(),
            description: z.string(),
          }),
        )
        .superRefine((list, ctx) => {
          list.forEach(({ name }, index) => {
            if (
              list.filter((_, i) => i !== index).find((l) => l.name === name)
            ) {
              ctx.addIssue({
                message: `Card "${name}" is duplicated`,
                code: z.ZodIssueCode.custom,
                path: [index, "name"],
              });
            }
          });
        }),
      playableRoles: z.array(z.object({ roleName: z.string() })),
    }),
  )