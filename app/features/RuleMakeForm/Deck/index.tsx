import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import React from "react";
import type { FieldArrayWithId, UseFieldArrayReturn } from "react-hook-form";
import { List } from "./List";
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
      <Grid>
        {deckFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <label htmlFor="name">デッキ名</label>
            <input type="text" {...register(`decks.${index}.name`)} />
            <PlayableRoles
              control={control}
              rolesFields={rolesFields}
              index={index}
            />
            <label htmlFor="list">リスト</label>
            <List
              control={control}
              register={register}
              trigger={trigger}
              errors={errors}
              index={index}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className={css({
                gridColumn: "1/3",
              })}
            >
              削除
            </button>
            <ErrorNotice>{errors.decks?.[index]?.message}</ErrorNotice>
          </React.Fragment>
        ))}
        <button
          type="button"
          onClick={() => {
            append({
              name: "",
              playableRoles: [],
              list: [],
            });
          }}
          className={css({
            gridColumn: "1/3",
          })}
        >
          追加
        </button>

        <ErrorNotice>{errors.decks?.root?.message}</ErrorNotice>
      </Grid>
    </>
  );
};
