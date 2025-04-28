import { playerSchema } from "app/zodSchemas/ruleMakeForm/playerSchema";
import type { z } from "zod";

export const player: z.infer<typeof playerSchema> = {
  min: 1,
  max: 1,
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.players normal test", () => {
    const validate = playerSchema.safeParse(player);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
