import { RuleSchema } from "app/zodSchemas/ruleMakeForm";
import { decks } from "./decks";
import { defaultHands } from "./defaultHands";
import { dices } from "./dices";
import { fieldAreas } from "./fieldAreas";
import { player } from "./player";
import { roles } from "./roles";
import { turn } from "./turn";

export const defaultValues = {
  name: "special rule name",
  description: "",
  player,
  roles,
  turn,
  decks,
  defaultHands,
  fieldAreas,
  dices,
  rankingBy: "hands",
} as const;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue normal test", () => {
    const validate = RuleSchema.safeParse(defaultValues);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
