import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import React, { useState } from "react";
import type {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from "react-hook-form";

export const Card = ({
  register,
  trigger,
  errors,
  index,
  i,
  field,
  fields,
  update,
  remove,
}: RuleMakeFormChildrenProps & {
  index: number;
  i: number;
  field: FieldArrayWithId<RuleType, `decks.${number}.list`, "id">;
  fields: FieldArrayWithId<RuleType, `decks.${number}.list`, "id">[];
  update: UseFieldArrayUpdate<RuleType, `decks.${number}.list`>;
  remove: UseFieldArrayRemove;
}) => {
  const [isSelectCategory, setIsSelectCategory] = useState<
    "not" | "add" | "select"
  >(field.categoryName ? "select" : "not");
  const [category, setCategory] = useState(field.categoryName);

  return (
    <React.Fragment key={field.id}>
      <label htmlFor={`decks.${index}.list.${i}.name`}>カード名</label>
      <input
        id={`decks.${index}.list.${i}.name`}
        {...register(`decks.${index}.list.${i}.name`, {
          onChange: () => trigger(`decks.${index}.list`),
          onBlur: (e) => {
            update(i, { ...field, name: e.target.value });
            trigger(`decks.${index}.list`);
          },
        })}
        className={css({
          gridColumn: "2/-1",
          width: "100%",
        })}
      />
      <ErrorNotice>
        {errors.decks?.[index]?.list?.[i]?.name?.message}
      </ErrorNotice>
      <label htmlFor={`decks.${index}.list.${i}.description`}>説明</label>
      <textarea
        {...register(`decks.${index}.list.${i}.description`)}
        id={`decks.${index}.list.${i}.description`}
        className={css({
          gridColumn: "2/-1",
        })}
      />
      <Grid>
        <input
          type="number"
          className={css({ width: "12" })}
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
              onChange={(e) => {
                if (e.target.value === "add") {
                  setIsSelectCategory("add");
                  update(i, {
                    name: field.name,
                    num: field.num,
                    description: field.description,
                  });
                  return;
                }
              }}
              defaultValue={field.categoryName}
            >
              <option value="add">追加</option>
              {fields
                .filter((f) => f.categoryName)
                .map(({ categoryName }, j) => (
                  <option key={j}>{categoryName}</option>
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
              onChange={(e) => setCategory(e.target.value)}
              onBlur={() => {
                setIsSelectCategory("select");
                update(i, {
                  ...field,
                  categoryName: category,
                });
              }}
            />
          ),
        }[isSelectCategory]
      }
      <button type="button" onClick={() => remove(i)}>
        削除
      </button>
    </React.Fragment>
  );
};
