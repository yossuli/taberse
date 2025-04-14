import { cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { Checklists } from "app/components/Checklists";
import { ErrorNotice } from "app/components/ErrorNotice";
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
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        {rolesFields.filter((r) => (r.name ?? "") !== "").length > 0 && (
          <>
            <label htmlFor="turn.skipRoles">スキップするロール</label>
            <Checklists
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
            {errors.turn?.ignoreRoles?.root && (
              <ErrorNotice>{errors.turn.ignoreRoles.root.message}</ErrorNotice>
            )}
          </>
        )}
        <label htmlFor="turn.turnTimeLimit">ターン制限時間</label>
        <input
          type="number"
          id="turn.turnTimeLimit"
          {...register("turn.turnTimeLimit.time", {
            valueAsNumber: true,
          })}
        />
        {errors.turn?.turnTimeLimit?.time && (
          <ErrorNotice>{errors.turn.turnTimeLimit.time.message}</ErrorNotice>
        )}
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
      </div>
      {errors.turn && !errors.turn?.ignoreRoles && (
        <ErrorNotice>{errors.turn.message}</ErrorNotice>
      )}
    </>
  );
};
