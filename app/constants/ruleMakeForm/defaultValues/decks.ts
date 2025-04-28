import { decksSchema } from "app/zodSchemas/ruleMakeForm/decksSchema";
import type { z } from "zod";
export const decks: z.infer<typeof decksSchema> = [
  {
    name: "default",
    list: [
      {
        name: "default",
        categoryName: "",
        num: 1,
        description: "",
      },
    ],
    playableRoles: [{ roleName: "default" }],
  },
];

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.decks normal test", () => {
    const validate = decksSchema.safeParse(decks);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
