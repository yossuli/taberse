import { NumList } from "app/components/NumList";
import type { RuleMakeFormChildrenProps, StrictOmit } from "app/types";
import { parseName } from "app/utils/parseName";
import { useFieldArray } from "react-hook-form";
import { ImportDeckSelect } from "./ImportDeckSelect";
import { TypeSelect } from "./TypeSelect";

export const Fixed = ({
  register,
  watch,
  control,
  index,
  deckNames,
}: StrictOmit<RuleMakeFormChildrenProps, "errors"> & {
  index: number;
  deckNames: string[];
}) => {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: `defaultHands.${index}.cards`,
  });
  const deckFrom = watch(`defaultHands.${index}`)?.deckFrom;
  const cardNames = watch("decks")
    ?.find(({ name }) => name === deckFrom)
    ?.list.map(({ name, num }) => ({ label: name, max: num }));

  return (
    <>
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
              append({ name: parseName(label, "CardName"), num });
            } else {
              update(labelIndex, { name: parseName(label, "CardName"), num });
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
    </>
  );
};
