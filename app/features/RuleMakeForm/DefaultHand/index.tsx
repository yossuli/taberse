import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { flex } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { Each } from "./Each";

export const DefaultHand = ({
  register,
  trigger,
  watch,
  control,
  errors,
}: RuleMakeFormChildrenProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "defaultHand",
  });
  const roleNames = watch("roles")?.map(({ name }) => name);
  const deckName = watch("decks")?.[0]?.name;
  return (
    <>
      <label htmlFor="decks.list.add">初期手札</label>
      <Grid columns={7}>
        <span
          className={flex({
            borderBottom: "1px solid var(--border)",
            width: "100%",
            justifyContent: "center",
          })}
        >
          ロール
        </span>
        <span
          className={flex({
            gridColumn: "2/-1",
            borderBottom: "1px solid var(--border)",
            width: "100%",
            justifyContent: "center",
          })}
        >
          設定
        </span>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <select
              {...register(`defaultHand.${index}.roleFor`, {})}
              value={roleNames?.[0]}
            >
              {roleNames?.map((roleName, i) => (
                <option key={i} value={roleName}>
                  {roleName}
                </option>
              ))}
            </select>
            <Each
              index={index}
              field={field}
              register={register}
              trigger={trigger}
              watch={watch}
              control={control}
              errors={errors}
            />
            <ErrorNotice>{errors.defaultHand?.root?.message}</ErrorNotice>
          </React.Fragment>
        ))}
        <button
          type="button"
          className={css({
            gridColumn: "1/-1",
          })}
          onClick={() =>
            append({
              roleFor: roleNames?.[0],
              type: "random",
              number: 1,
              deckFrom: deckName,
            })
          }
        >
          追加
        </button>
      </Grid>
    </>
  );
};
