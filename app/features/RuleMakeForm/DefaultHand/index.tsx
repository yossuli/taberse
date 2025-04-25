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
    name: "defaultHands",
  });
  const roleNames = watch("roles")?.map(({ name }) => name);
  const deckName = watch("decks")?.[0]?.name;
  return (
    <>
      <label htmlFor="decks.list.add">初期手札</label>
      <Grid columns={3}>
        ロール
        <span
          className={flex({
            gridColumn: "2/-1",
          })}
        >
          設定
        </span>
        <hr />
        {fields.map((_, index) => (
          <React.Fragment key={index}>
            <select
              {...register(`defaultHands.${index}.roleFor`, {})}
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
              register={register}
              trigger={trigger}
              watch={watch}
              control={control}
              errors={errors}
              remove={remove}
            />
            <ErrorNotice>{errors.defaultHands?.root?.message}</ErrorNotice>
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
              type: "fixed",
              deckFrom: deckName,
              cards: [
                {
                  name: "default",
                  num: 1,
                },
              ],
            })
          }
        >
          追加
        </button>
      </Grid>
    </>
  );
};
