import { z } from "zod";

export const playerSchema = z
  .object({
    min: z.number().int().min(1),
    max: z.number().int().min(1),
  })
  .superRefine(({ min, max }, ctx) => {
    if (min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "min must be less than or equal to max",
      });
    }
  });

