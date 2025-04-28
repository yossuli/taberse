import { fieldAreasSchema } from "app/zodSchemas/ruleMakeForm/fieldAreasSchema";
import type { z } from "zod";

export const fieldAreas: z.infer<typeof fieldAreasSchema> = [
  {
    name: "default",
    description: "",
    roleFor: "default",
    fieldSize: {
      width: 1,
      height: 1,
    },
    field: [
      {
        name: "default",
        description: "default",
        color: "#000000",
        area: { l: 0, t: 0, r: 0, b: 0 },
        operableRoles: [{ roleName: "default" }],
        visibleRoles: [{ roleName: "default" }],
      },
    ],
  },
];

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("defaultValue.fieldAreas normal test", () => {
    const validate = fieldAreasSchema.safeParse(fieldAreas);
    expect(
      validate.success,
      `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
    ).toBe(true);
  });
}
