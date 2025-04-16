import { css } from "@ss/css";
import { ErrorNotice } from "app/components/ErrorNotice";
import { NumList } from "app/components/NumList";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import React from "react";
import { type FieldArrayWithId, useFieldArray } from "react-hook-form";
import { ImportDeckSelect } from "./ImportDeckSelect";
import { TypeSelect } from "./TypeSelect";

export const Each = ({
  register,
  watch,
  control,
  errors,
  index,
  field: { type, deckFrom },
}: RuleMakeFormChildrenProps & {
  index: number;
  field: FieldArrayWithId<RuleType, "defaultHand", "id">;
}) => {
  const deckNames = watch("decks")?.map(({ name }) => name);
  const cardNames = watch("decks")
    ?.find(({ name }) => name === deckFrom)
    ?.list.map(({ name, num }) => ({ label: name, max: num }));
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: `defaultHand.${index}.cards`,
  });
  return (
    <React.Fragment>
      {type === "fixed" && (
        <React.Fragment>
          <ImportDeckSelect
            register={register}
            deckNames={deckNames}
            index={index}
          />
          から
          {cardNames && (
            <NumList
              labels={cardNames}
              fields={fields}
              upsert={(label, num) => {
                const labelIndex = fields.findIndex(
                  (field) => field.name === label,
                );
                if (labelIndex === -1) {
                  append({ name: label, num });
                } else {
                  update(labelIndex, { name: label, num });
                }
              }}
              remove={(fields, label) => {
                const labelIndex = fields.findIndex(
                  (field) => field.name === label,
                );
                if (labelIndex !== -1) {
                  remove(labelIndex);
                }
              }}
            />
          )}
          で
          <TypeSelect register={register} index={index} isTypeFixed />
        </React.Fragment>
      )}
      {type === "random" && (
        <React.Fragment>
          <TypeSelect register={register} index={index} />
          に
          <ImportDeckSelect
            register={register}
            deckNames={deckNames}
            index={index}
          />
          から
          <input
            type="number"
            {...register(`defaultHand.${index}.number`, {
              valueAsNumber: true,
            })}
            className={css({
              width: "16",
            })}
          />
          枚
        </React.Fragment>
      )}
      <ErrorNotice>{errors.defaultHand?.[index]?.message}</ErrorNotice>
    </React.Fragment>
  );
};
