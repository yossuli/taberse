import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { Each } from "./Each";

export const FieldAreas = ({
  errors,
  register,
  control,
  watch,
  trigger,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldAreas",
  });
  const roleNames = watch("roles")?.map(({ name }) => name);
  return (
    <>
      <label htmlFor="`fieldAreas">プレイフィールド</label>
      <Grid columns={4}>
        {fields.map((_, index) => (
          <React.Fragment key={index}>
            <Each
              register={register}
              index={index}
              roleNames={roleNames}
              watch={watch}
              control={control}
              trigger={trigger}
              errors={errors}
            />
            <button
              type="button"
              className={css({
                gridColumn: "1/-1",
              })}
              onClick={() => remove(index)}
            >
              削除
            </button>
          </React.Fragment>
        ))}
        <ErrorNotice>{errors.fieldAreas?.root?.message}</ErrorNotice>
        <button
          type="button"
          className={css({
            gridColumn: "1/-1",
          })}
          onClick={() =>
            append({
              name: "",
              description: "",
              roleFor: "",
              fieldSize: {
                width: 0,
                height: 0,
              },
              field: [],
            })
          }
        >
          追加
        </button>
      </Grid>
    </>
  );
};
