import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { List } from "./List";
import { PlayableRoles } from "./PlayableRoles";

export const Decks = ({
  register,
  trigger,
  watch,
  control,
  errors,
}: RuleMakeFormChildrenProps) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "decks",
  });

  return (
    <>
      <label htmlFor="decks">デッキ</label>
      <Grid>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <LabelInput
              label="デッキ名"
              register={register(`decks.${index}.name`)}
            />
            <PlayableRoles control={control} watch={watch} index={index} />
            <label htmlFor="decks.list.add">リスト</label>
            <List
              watch={watch}
              control={control}
              register={register}
              trigger={trigger}
              errors={errors}
              index={index}
            />
            <ErrorNotice>{errors.decks?.[index]?.message}</ErrorNotice>
          </React.Fragment>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              playableRoles: [],
              list: [],
            })
          }
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
