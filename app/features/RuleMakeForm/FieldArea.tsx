import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { flex } from "@ss/patterns";
import { AccordionDescription } from "app/components/AccordionDescription";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";

export const FieldArea = ({
  errors,
  register,
  control,
  watch,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "fieldArea",
  });
  const roleNames = watch("roles")?.map(({ name }) => name);
  return (
    <>
      <label htmlFor="fieldArea">プレイフィールド</label>
      <Grid columns={3}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <label htmlFor={field.id}>該当ロール</label>
            <select
              {...register(`fieldArea.${index}.roleFor`)}
              className={css({
                gridColumn: "2/-1",
              })}
              id={field.id}
            >
              {roleNames.map((name, i) => (
                <option value={name} key={i}>
                  {name}
                </option>
              ))}
            </select>
            <LabelInput
              register={register(`fieldArea.${index}.name`)}
              label="フィールド名"
              className={css({ gridColumn: "2/-1" })}
            />
            <AccordionDescription
              register={register(`fieldArea.${index}.description`)}
            />
            <div
              className={flex({
                width: "100%",
                gap: 2,
                gridColumnStart: 2,
                alignItems: "center",
              })}
            >
              <LabelInput
                register={register(`fieldArea.${index}.fieldSize.width`)}
                label="幅"
                className={css({ width: 14 })}
              />
              <LabelInput
                register={register(`fieldArea.${index}.fieldSize.height`)}
                label="高さ"
                className={css({ width: 14 })}
              />
            </div>
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>
          </React.Fragment>
        ))}
        <ErrorNotice>{errors.fieldArea?.root?.message}</ErrorNotice>
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
            })
          }
        >
          追加
        </button>
      </Grid>
    </>
  );
};
