import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const Roles = ({
  errors,
  trigger,
  register,
  control,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "roles",
  });
  return (
    <>
      <label htmlFor="roles">ロール</label>
      <Grid>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <input
              {...register(`roles.${index}.name`, {
                onChange: () => trigger("roles"),
                onBlur: (e) => {
                  update(index, { name: e.target.value });
                  trigger("roles");
                },
              })}
            />
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>
            <ErrorNotice>{errors.roles?.[index]?.name?.message}</ErrorNotice>
          </React.Fragment>
        ))}
        <ErrorNotice>{errors.roles?.root?.message}</ErrorNotice>
        <button
          type="button"
          className={css({
            gridColumn: "1/3",
          })}
          onClick={() => append({ name: "" })}
        >
          追加
        </button>
        <ErrorNotice>{errors.roles?.root?.message}</ErrorNotice>
      </Grid>
    </>
  );
};
