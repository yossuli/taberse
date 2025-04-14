import { Grid } from "@ss/jsx";
import { Checklist } from "app/components/Checklist";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import type { UseFieldArrayReturn } from "react-hook-form";

export const Turn = ({
  register,
  errors,
  rolesFields,
  fieldArrayMethod: { fields: turnIgnoreFields, append, remove },
}: RuleMakeFormChildrenProps & {
  fieldArrayMethod: UseFieldArrayReturn<RuleType, "turn.ignoreRoles">;
  rolesFields: UseFieldArrayReturn<RuleType, "roles">["fields"];
}) => {
  return (
    <>
      <label htmlFor="turn">ターン</label>
      <Grid>
        {rolesFields.filter((r) => (r.name ?? "") !== "").length > 0 && (
          <>
            <label htmlFor="turn.skipRoles">スキップするロール</label>
            <Checklist
              field={turnIgnoreFields}
              labels={rolesFields.map((roleField) => ({
                id: roleField.id,
                label: roleField.name,
              }))}
              append={(role) => append({ roleName: role })}
              remove={(field, value) =>
                remove(field.findIndex((f) => f.roleName === value))
              }
            />
            <ErrorNotice>{errors.turn?.ignoreRoles?.root?.message}</ErrorNotice>
          </>
        )}
        <LabelInput
          label="ターン制限時間"
          type="number"
          register={register("turn.turnTimeLimit.time", {
            valueAsNumber: true,
          })}
        />
        <ErrorNotice>{errors.turn?.turnTimeLimit?.time?.message}</ErrorNotice>
        <label htmlFor="turn.turnTimeLimit.type">
          制限時間のターン終了時の扱い
        </label>
        <select
          id="turn.turnTimeLimit.type"
          {...register("turn.turnTimeLimit.type")}
        >
          <option value="persistent">持続</option>
          <option value="reset">リセット</option>
        </select>
        <ErrorNotice>
          {errors.turn?.ignoreRoles && !errors.turn?.ignoreRoles?.message}
        </ErrorNotice>
      </Grid>
    </>
  );
};
