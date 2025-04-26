import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { AccordionDescription } from "app/components/AccordionDescription";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type {
  RuleMakeFormChildrenProps,
  RuleType,
  StrictOmit,
} from "app/types";
import { useState } from "react";
import type { UseFieldArrayRemove, UseFieldArrayUpdate } from "react-hook-form";

export const Card = ({
  register,
  trigger,
  errors,
  index,
  i,
  watch,
  update,
  remove,
}: StrictOmit<RuleMakeFormChildrenProps, "control"> & {
  index: number;
  i: number;
  update: UseFieldArrayUpdate<RuleType, `decks.${number}.list`>;
  remove: UseFieldArrayRemove;
}) => {
  const fields = watch(`decks.${index}.list`);
  const field = fields[i];
  const [isSelectCategory, setIsSelectCategory] = useState<
    "not" | "add" | "select"
  >("not");
  return (
    <>
      <LabelInput
        register={register(`decks.${index}.list.${i}.name`, {
          onChange: () => trigger(`decks.${index}.list`),
          onBlur: () => trigger(`decks.${index}.list`),
        })}
        label="カード名"
      />
      <ErrorNotice>
        {errors.decks?.[index]?.list?.[i]?.name?.message}
      </ErrorNotice>
      <AccordionDescription
        register={register(`decks.${index}.list.${i}.description`)}
      />
      <Grid gridColumn="2/3">
        <input
          type="number"
          className={css({ width: "14" })}
          {...register(`decks.${index}.list.${i}.num`, {
            valueAsNumber: true,
          })}
        />
        枚
      </Grid>
      {
        {
          select: (
            <select
              {...register(`decks.${index}.list.${i}.categoryName`, {
                onChange: (e) => {
                  if (e.target.value === "") {
                    setIsSelectCategory("add");
                    return;
                  }
                  if (field.categoryName === "none") {
                    update(i, {
                      ...field,
                      categoryName: undefined,
                    });
                    return;
                  }
                },
              })}
              value={field.categoryName ?? fields[0].categoryName}
            >
              <option value="">追加</option>
              <option value="none">未選択</option>
              {Array.from(
                new Set(
                  fields
                    .filter((f) => f.categoryName)
                    .map(({ categoryName }) => categoryName),
                ),
              ).map((categoryName, j) => (
                <option key={j} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          ),
          not: (
            <button
              type="button"
              onClick={() => {
                if (fields.filter((f) => f.categoryName).length === 0) {
                  setIsSelectCategory("add");
                } else {
                  setIsSelectCategory("select");
                }
              }}
            >
              カテゴリ選択
            </button>
          ),
          add: (
            <input
              {...register(`decks.${index}.list.${i}.categoryName`, {
                onBlur: () => setIsSelectCategory("select"),
              })}
            />
          ),
        }[isSelectCategory]
      }
      <button type="button" onClick={() => remove(i)}>
        削除
      </button>
    </>
  );
};
