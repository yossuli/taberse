import { z } from "zod";

export const playerSchema = z.object({
  min: z.number().int().min(1),
  max: z.number().int().min(1),
});
