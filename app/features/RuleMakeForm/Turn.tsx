import { css, cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import React from "react";
import type { UseFieldArrayReturn } from "react-hook-form";

export const Turn = ({
  register,
  trigger,
  errors,
  rolesFields,
  fieldArrayMethod: { fields: turnIgnoreFields, append, remove, update },
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
            <div
              className={cx(
                grid({
                  columns: 2,
                }),
              )}
            >
              {turnIgnoreFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <select
                    id={`turn.ignoreRoles.${index}.roleName`}
                    {...register(`turn.ignoreRoles.${index}.roleName`)}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        remove(index);
                        return;
                      }
                      update(index, { roleName: e.target.value });
                      trigger("turn.ignoreRoles", {
                        shouldFocus: true,
                      });
                    }}
                  >
                    <option value="">なし</option>
                    {rolesFields.map((field) => (
                      <option key={field.id} value={field.name}>
                        {field.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => remove(index)}>
                    削除
                  </button>
                  {errors.turn?.ignoreRoles?.[index]?.roleName && (
                    <ErrorNotice>
                      {errors.turn.ignoreRoles[index].roleName.message}
                    </ErrorNotice>
                  )}
                </React.Fragment>
              ))}
              {errors.turn?.ignoreRoles?.root && (
                <ErrorNotice>
                  {errors.turn.ignoreRoles.root.message}
                </ErrorNotice>
              )}
              <button
                type="button"
                className={css({
                  gridColumn: "1/3",
                })}
                onClick={() => {
                  if (turnIgnoreFields.some((f) => f.roleName === "")) {
                    return;
                  }
                  if (turnIgnoreFields.length >= rolesFields.length) {
                    return;
                  }
                  append({ roleName: "" });
                }}
              >
                追加
              </button>
            </div>
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
