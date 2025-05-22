import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { emptyIter2Null } from "app/utils/emptyIter2Null";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import type { fieldAreasSchema } from "../fieldAreasSchema";
import { template } from "./template";

export type FieldAreas = z.infer<typeof fieldAreasSchema>;

export const fieldOperableRoles = (
  fieldAreas: FieldAreas,
  roleNames: string[],
  ctx: z.RefinementCtx,
) => {
  callWithIfDefine(
    findWithIndexResult(fieldAreas, (area) =>
      findWithIndexResult(area.field, (field) =>
        emptyIter2Null(
          field.operableRoles.filter((r) => !roleNames.includes(r.roleName)),
        ),
      ),
    ),
    ([_1, i, [_2, j, outliers]]) => {
      if (outliers) {
        ctx.addIssue({
          code: "custom",
          message: template.roles(
            roleNames,
            `fieldAreas[${i}].field[${j}].operableRoles`,
            objArr2StrArr(outliers, "roleName"),
          ),
        });
      }
    },
  );
};
