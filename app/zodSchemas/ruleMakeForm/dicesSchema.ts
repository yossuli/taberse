import { z } from "zod";

export const diceName = z.string().min(1).brand("DiceName");

export const dicesRange = z.object({
  min: z.number().int(),
  max: z.number().int(),
  step: z.number().int().positive(),
});

export const diceSchema = z.object({
  name: diceName,
  range: dicesRange,
});
export const dicesSchema = z
  .array(diceSchema)
  .superRefine((dice, ctx) => {
    if (dice.every((d) => d.range.min > d.range.max - d.range.step)) {
      ctx.addIssue({
        message: "Dice min must be less than max",
        code: z.ZodIssueCode.custom,
      });
    }
  })
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

export type Dices = z.infer<typeof dicesSchema>;
export type Dice = z.infer<typeof diceSchema>;
export type DiceName = z.infer<typeof diceName>;
export type DicesRange = z.infer<typeof dicesRange>;
