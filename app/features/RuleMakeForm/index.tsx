import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import { useFieldArray } from "react-hook-form";
import { Description } from "./Description";
import { Players } from "./Players";
import { Roles } from "./Roles";
import { Title } from "./Title";
import { Turn } from "./Turn";

export const RuleMakeForm = () => {
  const { control, onSubmit, ...ruleMakeForm } = useRuleMakeForm();
  const rolesFieldsArray = useFieldArray({
    control,
    name: "roles",
  });
  const { fields: rolesFields, append } = rolesFieldsArray;
  const turnIgnoreFieldsArray = useFieldArray({
    control,
    name: "turn.ignoreRoles",
  });

  return (
    <form
      onSubmit={onSubmit}
      className={grid({
        columns: 2,
        "& > label::after": {
          content: "'　：'",
        },
      })}
    >
      <Title {...ruleMakeForm} />
      <Description {...ruleMakeForm} />
      <Players {...ruleMakeForm} />
      <Roles fieldArrayMethod={rolesFieldsArray} {...ruleMakeForm} />
      <Turn
        {...ruleMakeForm}
        fieldArrayMethod={turnIgnoreFieldsArray}
        rolesFields={rolesFields}
      />
      <label htmlFor="decks">デッキ</label>
      {/* <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        {rolesFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <input
              {...register(`decks.${index}.name`)}
              onChange={(e) => {
                update(index, e.target.value);
                trigger("decks", {
                  shouldFocus: true,
                });
              }}
            />
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>
            {errors.decks?.[index] && (
              <ErrorNotice>{errors.decks[index].message}</ErrorNotice>
            )}
            <div
              className={css({
                gridColumn: "1/3",
              })}
            >
              {}
            </div>
          </React.Fragment>
        ))}
        <button
          type="button"
          className={css({
            gridColumn: "1/3",
          })}
          onClick={() => {
            append("");
          }}
        >
          追加
        </button>

        {errors.decks?.root && (
          <ErrorNotice>{errors.decks.root.message}</ErrorNotice>
        )}
      </div> */}
      <button
        type="submit"
        className={css({
          gridColumn: "1/3",
        })}
      >
        作成
      </button>
    </form>
  );
};
