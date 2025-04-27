import { playerSchema } from "app/zodSchemas/ruleMakeForm/playerSchema";

export const player = {
  min: 1,
  max: 1,
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.players normal test", () => {
    const validate = playerSchema.safeParse(player);
    expect(validate.success).toBe(true);
  });
}
