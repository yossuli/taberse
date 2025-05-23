import { z } from "zod";
import { roleName } from "./roles";

export const fieldName = z.string().min(1).brand("FieldName");
export const fieldAreaName = z.string().min(1).brand("FieldAreaName");
export const fieldAreasSchema = z
  .array(
    z
      .object({
        name: fieldAreaName,
        description: z.string(),
        roleFor: roleName,
        fieldSize: z.object({
          width: z.number().positive(),
          height: z.number().positive(),
        }),
        field: z
          .array(
            z.object({
              name: fieldName,
              description: z.string(),
              color: z.string().regex(/^(#([0-9a-f]{3}|[0-9a-f]{6})|())$/i, {
                message: "Invalid color format",
              }),
              area: z.object({
                l: z.number().int().nonnegative(),
                t: z.number().int().nonnegative(),
                r: z.number().int().nonnegative(),
                b: z.number().int().nonnegative(),
              }),
              operableRoles: z.array(z.object({ roleName })),
              visibleRoles: z.array(z.object({ roleName })),
            }),
          )
          .superRefine((field, ctx) => {
            field.forEach(({ name }, index) => {
              if (
                field.filter((_, i) => i !== index).find((f) => f.name === name)
              ) {
                ctx.addIssue({
                  message: `Field "${name}" is duplicated`,
                  code: z.ZodIssueCode.custom,
                  path: [index, "name"],
                });
              }
            });
          }),
      })

      .superRefine((fieldArea, ctx) => {
        fieldArea.field.forEach(({ area, name }, index) => {
          if (area.b > fieldArea.fieldSize.height) {
            ctx.addIssue({
              message: `Field "${name}" is out of fieldSize`,
              code: z.ZodIssueCode.custom,
              path: [index, "area"],
            });
            ctx.addIssue({
              message: `This fieldArea size should be ${fieldArea.fieldSize.height + 1} x ${fieldArea.fieldSize.width}`,
              code: z.ZodIssueCode.custom,
              path: ["fieldSize"],
            });
          }
          if (area.r > fieldArea.fieldSize.width) {
            ctx.addIssue({
              message: `Field "${name}" is out of fieldSize`,
              code: z.ZodIssueCode.custom,
              path: [index, "area"],
            });
            ctx.addIssue({
              message: `This fieldArea size should be ${fieldArea.fieldSize.height} x ${fieldArea.fieldSize.width + 1}`,
              code: z.ZodIssueCode.custom,
              path: ["fieldSize"],
            });
          }
        });
      }),
  )
  .superRefine((fieldAreas, ctx) => {
    fieldAreas.forEach(({ name }, index) => {
      if (
        fieldAreas.filter((_, i) => i !== index).find((f) => f.name === name)
      ) {
        ctx.addIssue({
          message: `FieldArea "${name}" is duplicated`,
          code: z.ZodIssueCode.custom,
          path: [index, "name"],
        });
      }
    });
  });

export type FieldAreas = z.infer<typeof fieldAreasSchema>;
