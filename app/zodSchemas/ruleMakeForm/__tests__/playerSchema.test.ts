import { playerSchema } from "../playerSchema";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it("プレイヤーの最小値は最大値より小さい", () => {
    const invalidPlayer = { min: 5, max: 4 };
    expect(playerSchema.safeParse(invalidPlayer).error?.issues[0].message).toBe(
      "min must be less than or equal to max",
    );
  });
}
