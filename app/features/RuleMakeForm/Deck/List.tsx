import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import { type UseFieldArrayReturn, useFieldArray } from "react-hook-form";

export const List = ({
  control,
  register,
  trigger,
  fieldArrayMethod: { append: append1 },
  errors,
  index,
}: RuleMakeFormChildrenProps & {
  fieldArrayMethod: UseFieldArrayReturn<RuleType, "decks">;
  index: number;
}) => {
  [];
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `decks.${index}.list`,
  });
  return (
    <>
      <div
        className={grid({
          columns: 2,
        })}
      >
        {fields.map((field, i) => (
          <div
            className={grid({
              columns: 2,
            })}
            key={field.id}
          >
            <input
              {...register(`decks.${index}.list.${i}.name`)}
              onChange={(e) => {
                update(i, {
                  name: e.target.value,
                  categoryName: "",
                  description: "",
                });
                trigger("decks", {
                  shouldFocus: true,
                });
              }}
            />
            {/* <button type="button" onClick={() => remove(i)}>
              削除
            </button> */}
            {errors.decks?.[index] && <div>{errors.decks[index].message}</div>}
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append1({
              name: "",
              list: [
                {
                  name: "",
                  categoryName: "",
                  description: "",
                },
              ],
              playableRoles: [""],
            });
          }}
          className={css({
            gridColumn: "1/3",
          })}
        >
          追加
        </button>
      </div>
    </>
  );
};
