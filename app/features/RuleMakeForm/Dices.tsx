import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";
import { parseName } from "app/utils/parseName";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const Dices = ({
  errors,
  trigger,
  register,
  control,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dices",
  });
  return (
    <>
      <label htmlFor="dices">サイコロ</label>
      <Grid columns={7}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <LabelInput
              label="サイコロ名"
              register={register(`dices.${index}.name`, {
                onChange: () => trigger("dices"),
                onBlur: () => trigger("dices"),
              })}
            />
            <ErrorNotice>{errors.dices?.[index]?.name?.message}</ErrorNotice>
            <LabelInput
              label="最小値"
              register={register(`dices.${index}.range.min`, {
                onChange: () => trigger("dices"),
                onBlur: () => trigger("dices"),
              })}
              type="number"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
            <LabelInput
              label="最大値"
              register={register(`dices.${index}.range.max`, {
                onChange: () => trigger("dices"),
                onBlur: () => trigger("dices"),
              })}
              type="number"
              gridColumnStart={3}
              gridColumnEnd={5}
            />
            <LabelInput
              label="刻み"
              register={register(`dices.${index}.range.step`, {
                onChange: () => trigger("dices"),
                onBlur: () => trigger("dices"),
              })}
              type="number"
              gridColumnStart={5}
              gridColumnEnd={7}
            />
            <ErrorNotice>
              {errors.dices?.[index]?.range?.min?.message ||
                errors.dices?.[index]?.range?.max?.message ||
                errors.dices?.[index]?.range?.step?.message}
            </ErrorNotice>
            <input
              type="button"
              onClick={() => {
                remove(index);
                trigger("dices");
              }}
              value="削除"
            />
          </React.Fragment>
        ))}
      </Grid>
      <button
        type="button"
        onClick={() =>
          append({
            name: parseName("", "DiceName"),
            range: { min: 1, max: 6, step: 1 },
          })
        }
        disabled={!!errors.dices && fields.length > 0}
        className={css({
          gridColumn: "1/3",
        })}
      >
        追加
      </button>
    </>
  );
};
