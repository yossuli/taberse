import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const List = ({
  control,
  register,
  trigger,
  errors,
  index,
}: RuleMakeFormChildrenProps & {
  index: number;
}) => {
  [];
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `decks.${index}.list`,
  });
  return (
    <Grid>
      {fields.map((field, i) => (
        <React.Fragment key={field.id}>
          <input
            {...register(`decks.${index}.list.${i}.name`)}
            onChange={(e) => {
              update(i, {
                name: e.target.value,
                categoryName: "",
                description: "",
              });
              trigger(`decks.${index}.list`, {
                shouldFocus: true,
              });
            }}
          />
          <button type="button" onClick={() => remove(i)}>
            削除
          </button>
          <ErrorNotice>
            {errors.decks?.[index]?.list?.[i]?.name?.message}
          </ErrorNotice>
        </React.Fragment>
      ))}
      <button
        type="button"
        onClick={() => {
          append({
            name: "",
            categoryName: "",
            description: "",
          });
        }}
        className={css({
          gridColumn: "1/3",
        })}
      >
        追加
      </button>
    </Grid>
  );
};
