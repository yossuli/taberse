import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps, RuleType } from "app/types";
import type { FieldArrayWithId } from "react-hook-form";
import { Fixed } from "./Fixed";
import { Random } from "./Random";

export const Each = ({
  register,
  trigger,
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

  return (
    <>
      {type === "fixed" && (
        <Fixed
          register={register}
          trigger={trigger}
          watch={watch}
          control={control}
          index={index}
          deckFrom={deckFrom}
          deckNames={deckNames}
        />
      )}
      {type === "random" && (
        <Random register={register} index={index} deckNames={deckNames} />
      )}
      <ErrorNotice>{errors.defaultHand?.[index]?.message}</ErrorNotice>
    </>
  );
};
