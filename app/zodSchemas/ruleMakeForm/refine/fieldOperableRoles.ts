import type { RoleName } from "app/types/ruleMakeForm";
import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { emptyIter2Null } from "app/utils/emptyIter2Null";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import type { z } from "zod";
import { template } from "./template";
import type { FieldAreas } from "./validateFieldVisibleRoles";

export const fieldOperableRoles = (
  fieldAreas: FieldAreas,
  roleNames: RoleName[],
  ctx: z.RefinementCtx,
) => {
  callWithIfDefine(
    findWithIndexResult(fieldAreas, (area) =>
      findWithIndexResult(area.field, (field) =>
        emptyIter2Null(
          objArr2StrArr(field.operableRoles, "roleName").filter(
            (roleName) => !roleNames.includes(roleName),
          ),
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
            outliers,
          ),
        });
      }
    },
  );
};
