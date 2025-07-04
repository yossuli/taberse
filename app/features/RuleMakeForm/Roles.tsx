import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import { parseName } from "app/utils/parseName";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const Roles = ({
  errors,
  trigger,
  register,
  control,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });
  return (
    <>
      <label htmlFor="roles">ロール</label>
      <Grid columns={3}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <input
              {...register(`roles.${index}.name`, {
                onChange: () => trigger("roles"),
                onBlur: () => trigger("roles"),
              })}
            />
            <input
              type="number"
              min={1}
              {...register(`roles.${index}.num`, {
                valueAsNumber: true,
                onChange: () => trigger(),
              })}
            />
            <button
              type="button"
              onClick={() => {
                remove(index);
                trigger("roles");
              }}
            >
              削除
            </button>
            <ErrorNotice>{errors.roles?.[index]?.name?.message}</ErrorNotice>
            <ErrorNotice>{errors.roles?.[index]?.num?.message}</ErrorNotice>
          </React.Fragment>
        ))}
        <ErrorNotice>{errors.roles?.root?.message}</ErrorNotice>
        <button
          type="button"
          className={css({
            gridColumn: "1/3",
          })}
          onClick={() => append({ name: parseName("", "RoleName"), num: 1 })}
          disabled={!!errors.roles && fields.length > 0}
        >
          追加
        </button>
        <ErrorNotice>{errors.roles?.message}</ErrorNotice>
      </Grid>
    </>
  );
};
