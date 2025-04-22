import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const Dice = ({
  errors,
  trigger,
  register,
  control,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dice",
  });
  return (
    <>
      <label htmlFor="dice">サイコロ</label>
      <Grid columns={7}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <LabelInput
              label="サイコロ名"
              register={register(`dice.${index}.name`, {
                onChange: () => trigger("dice"),
                onBlur: () => trigger("dice"),
              })}
            />
            <ErrorNotice>{errors.dice?.[index]?.name?.message}</ErrorNotice>
            <LabelInput
              label="最小値"
              register={register(`dice.${index}.range.min`, {
                onChange: () => trigger("dice"),
                onBlur: () => trigger("dice"),
              })}
              type="number"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
            <LabelInput
              label="最大値"
              register={register(`dice.${index}.range.max`, {
                onChange: () => trigger("dice"),
                onBlur: () => trigger("dice"),
              })}
              type="number"
              gridColumnStart={3}
              gridColumnEnd={5}
            />
            <LabelInput
              label="刻み"
              register={register(`dice.${index}.range.step`, {
                onChange: () => trigger("dice"),
                onBlur: () => trigger("dice"),
              })}
              type="number"
              gridColumnStart={5}
              gridColumnEnd={7}
            />
            <ErrorNotice>
              {errors.dice?.[index]?.range?.min?.message ||
                errors.dice?.[index]?.range?.max?.message ||
                errors.dice?.[index]?.range?.step?.message}
            </ErrorNotice>
            <input
              type="button"
              onClick={() => {
                remove(index);
                trigger("dice");
              }}
              value="削除"
            />
          </React.Fragment>
        ))}
      </Grid>
      <button
        type="button"
        onClick={() => append({ name: "", range: { min: 1, max: 6, step: 1 } })}
        disabled={!!errors.dice && fields.length > 0}
        className={css({
          gridColumn: "1/3",
        })}
      >
        追加
      </button>
    </>
  );
};
