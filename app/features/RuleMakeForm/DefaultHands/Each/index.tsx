import { Flex } from "@ss/jsx";
import { center } from "@ss/patterns";
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
  const { type } = watch(`defaultHands.${index}`);
  return (
    <>
      <Flex
        gap={2}
        className={center({
          width: "100%",
          "& > select": {
            height: "fit-content",
          },
        })}
      >
        {type === "fixed" && (
          <Fixed
            register={register}
            trigger={trigger}
            watch={watch}
            control={control}
            index={index}
            deckNames={deckNames}
          />
        )}
        {type === "random" && (
          <Random register={register} index={index} deckNames={deckNames} />
        )}
      </Flex>
      <input
        type="button"
        className=""
        onClick={() => remove(index)}
        value="削除"
      />
      <ErrorNotice>{errors.defaultHands?.[index]?.message}</ErrorNotice>
    </>
  );
};
