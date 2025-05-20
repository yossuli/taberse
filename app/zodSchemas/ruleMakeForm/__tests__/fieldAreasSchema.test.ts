import {
  field,
  fieldAreas,
} from "app/constants/ruleMakeForm/defaultValues/fieldAreas";
import { z } from "zod";
import { fieldAreasSchema } from "../fieldAreasSchema";

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;

  it("nameは重複禁止", () => {
    const validFieldAreas = [fieldAreas[0], fieldAreas[0]];

    expect(
      JSON.parse(
        fieldAreasSchema.safeParse(validFieldAreas).error?.message ?? "",
      ),
    ).toStrictEqual([
      {
        message: 'FieldArea "default" is duplicated',
        path: [0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'FieldArea "default" is duplicated',
        path: [1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });
  it("fieldはsizeに収まる(横)", () => {
    const validFieldAreas = [
      {
        ...fieldAreas[0],
        field: [
          {
            ...field,
            area: { l: 0, t: 0, r: 2, b: 1 },
          },
        ],
      },
    ];

    expect(
      JSON.parse(
        fieldAreasSchema.safeParse(validFieldAreas).error?.message ?? "",
      ),
    ).toStrictEqual([
      {
        message: 'Field "default" is out of fieldSize',
        code: z.ZodIssueCode.custom,
        path: [0, 0, "area"],
      },
      {
        code: z.ZodIssueCode.custom,
        message: "This fieldArea size should be 1 x 2",
        path: [0, "fieldSize"],
      },
    ]);
  });
  it("fieldはsizeに収まる(縦)", () => {
    const validFieldAreas = [
      {
        ...fieldAreas[0],
        field: [
          {
            ...field,
            area: { l: 0, t: 0, r: 1, b: 2 },
          },
        ],
      },
    ];

    expect(
      JSON.parse(
        fieldAreasSchema.safeParse(validFieldAreas).error?.message ?? "",
      ),
    ).toStrictEqual([
      {
        message: 'Field "default" is out of fieldSize',
        code: z.ZodIssueCode.custom,
        path: [0, 0, "area"],
      },
      {
        code: z.ZodIssueCode.custom,
        message: "This fieldArea size should be 2 x 1",
        path: [0, "fieldSize"],
      },
    ]);
  });

  it("各fieldのnameは重複禁止", () => {
    const validFieldAreas = [
      {
        ...fieldAreas[0],
        field: [field, field],
      },
    ];

    expect(
      JSON.parse(
        fieldAreasSchema.safeParse(validFieldAreas).error?.message ?? "",
      ),
    ).toStrictEqual([
      {
        message: 'Field "default" is duplicated',
        path: [0, "field", 0, "name"],
        code: z.ZodIssueCode.custom,
      },
      {
        message: 'Field "default" is duplicated',
        path: [0, "field", 1, "name"],
        code: z.ZodIssueCode.custom,
      },
    ]);
  });

  it("fieldの.colorはrrggbb or rgbに合致", () => {
    const validFieldAreas = [
      {
        ...fieldAreas[0],
        field: [
          {
            ...field,
            color: "#hhh",
          },
        ],
      },
    ];

    expect(
      JSON.parse(
        fieldAreasSchema.safeParse(validFieldAreas).error?.message ?? "",
      ),
    ).toStrictEqual([
      {
        message: "Invalid color format",
        path: [0, "field", 0, "color"],
        code: z.ZodIssueCode.invalid_string,
        validation: "regex",
      },
    ]);
  });
}
