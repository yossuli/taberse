import { dicesSchema } from "../dices";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("ダイスの最小値は最大値より小さい", () => {
    const invalidDice = [{ name: "Dice1", range: { min: 6, max: 5, step: 1 } }];
    expect(dicesSchema.safeParse(invalidDice).error?.issues[0].message).toBe(
      "Dice min must be less than max",
    );
  });
}
