import { Grid } from "@ss/jsx";
import { Checklist } from "app/components/Checklist";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import { LabelSelect } from "app/components/LabelSelect";
import type { RuleMakeFormChildrenProps } from "app/types";
import { parseName } from "app/utils/parseName";

export const Turn = ({
  control,
  watch,
  register,
  errors,
}: RuleMakeFormChildrenProps) => {
  const rolesFields = watch("roles");
  return (
    <>
      <label htmlFor="turn">ターン</label>
      <Grid>
        {rolesFields?.filter((r) => (r.name ?? "") !== "").length > 0 && (
          <>
            <label htmlFor="turn.skipRoles">スキップするロール</label>
            <Checklist
              control={control}
              name="turn.ignoreRoles"
              labels={rolesFields.map((roleField) => roleField.name)}
              checkOn={(append) => (role) =>
                append({ roleName: parseName(role, "RoleName") })
              }
              checkOff={(remove) => (field, value) =>
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
        <LabelSelect
          label="制限時間のターン終了時の扱い"
          options={[
            ["persistent", "持続"],
            ["reset", "リセット"],
          ]}
          register={register("turn.turnTimeLimit.type")}
        />
        <ErrorNotice>
          {errors.turn?.ignoreRoles && !errors.turn?.ignoreRoles?.message}
        </ErrorNotice>
      </Grid>
    </>
  );
};
