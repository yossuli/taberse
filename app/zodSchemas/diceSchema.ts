import { z } from "zod";

export const dicesSchema = z
  .array(
    z.object({
      name: z.string().min(1),
      range: z.object({
        min: z.number().int(),
        max: z.number().int(),
        step: z.number().int().positive(),
      }),
    }),
  )
  .refine(
    (dice) => dice.every((d) => d.range.min <= d.range.max - d.range.step),
    {
      message: "Dice min must be less than max",
    },
  )
  .superRefine((dice, ctx) => {
    dice.forEach(({ name }, index) => {
      if (dice.filter((_, i) => i !== index).find((d) => d.name === name)) {
        ctx.addIssue({
          message: `Dice "${name}" is duplicated`,
          code: z.ZodIssueCode.custom,
          path: [index, "name"],
        });
      }
    });
  });
