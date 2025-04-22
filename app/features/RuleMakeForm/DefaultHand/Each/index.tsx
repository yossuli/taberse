import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import { Fixed } from "./Fixed";
import { Random } from "./Random";

export const Each = ({
  register,
  trigger,
  watch,
  control,
  errors,
  index,
  remove,
}: RuleMakeFormChildrenProps & {
  index: number;
  remove: (index: number) => void;
}) => {
  const deckNames = watch("decks")?.map(({ name }) => name);
  const { type, deckFrom } = watch(`defaultHand.${index}`);
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
      <input
        type="button"
        className=""
        onClick={() => remove(index)}
        value="削除"
      />
      <ErrorNotice>{errors.defaultHand?.[index]?.message}</ErrorNotice>
    </>
  );
};
