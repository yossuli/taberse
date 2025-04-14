import { css, cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import React from "react";
import type { FieldArrayWithId, UseFieldArrayReturn } from "react-hook-form";
import { PlayableRoles } from "./PlayableRoles";

export const Deck = ({
  register,
  trigger,
  control,
  errors,
  deckFieldArray,
  rolesFields,
}: RuleMakeFormChildrenProps & {
  deckFieldArray: UseFieldArrayReturn<RuleType, "decks">;
  rolesFields: FieldArrayWithId<RuleType, "roles", "id">[];
}) => {
  const { fields: deckFields, remove, append } = deckFieldArray;
  console.log("fields", deckFields);
  return (
    <>
      <label htmlFor="decks">デッキ</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        <label htmlFor="list">リスト</label>
        <div
          className={grid({
            columns: 2,
          })}
        >
          {deckFields.map((field, index) => (
            <React.Fragment key={field.id}>
              <input type="text" {...register(`decks.${index}.name`)} />
              <button type="button" onClick={() => remove(index)}>
                削除
              </button>
              <PlayableRoles
                control={control}
                register={register}
                trigger={trigger}
                errors={errors}
                rolesFields={rolesFields}
                index={index}
              />
              {/* <List
                control={control}
                register={register}
                trigger={trigger}
                errors={errors}
                index={index}
                fieldArrayMethod={fieldArrayMethod}
              /> */}

              {errors.decks?.[index] && (
                <ErrorNotice>{errors.decks[index].message}</ErrorNotice>
              )}
            </React.Fragment>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            append({
              name: "",
              playableRoles: [],
            });
          }}
          className={css({
            gridColumn: "1/3",
          })}
        >
          追加
        </button>
        {errors.decks?.root && (
          <ErrorNotice>{errors.decks.root.message}</ErrorNotice>
        )}
      </div>
    </>
  );
};
