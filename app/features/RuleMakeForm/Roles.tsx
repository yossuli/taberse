import { css, cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import type { UseFieldArrayReturn } from "react-hook-form";

export const Roles = ({
  errors,
  trigger,
  register,
  fieldArrayMethod: { fields, append, remove, update },
}: RuleMakeFormChildrenProps & {
  fieldArrayMethod: UseFieldArrayReturn<RuleType>;
}) => {
  return (
    <>
      <label htmlFor="roles">ロール</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        <div className={css({ gridColumn: "1/3" })}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={cx(
                grid({
                  columns: 2,
                }),
              )}
            >
              <input
                {...register(`roles.${index}.name`)}
                onBlur={(e) => {
                  update(index, { name: e.target.value });
                  trigger?.("roles");
                }}
              />
              <button type="button" onClick={() => remove(index)}>
                削除
              </button>
              {errors.roles?.[index]?.name && (
                <ErrorNotice>{errors.roles[index].name.message}</ErrorNotice>
              )}
            </div>
          ))}
          {errors.roles?.root && (
            <ErrorNotice>{errors.roles.root.message}</ErrorNotice>
          )}
        </div>
        <button
          type="button"
          className={css({
            gridColumn: "1/3",
          })}
          onClick={() => {
            append({ name: "" });
          }}
        >
          追加
        </button>
        <ErrorNotice>{errors.roles?.root?.message}</ErrorNotice>
      </div>
    </>
  );
};
