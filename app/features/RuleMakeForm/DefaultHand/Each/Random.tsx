import { css } from "@ss/css";
import type { RuleMakeFormChildrenProps } from "app/types";
import { ImportDeckSelect } from "./ImportDeckSelect";
import { TypeSelect } from "./TypeSelect";

export const Random = ({
  register,
  index,
  deckNames,
}: Pick<RuleMakeFormChildrenProps, "register"> & {
  index: number;
  deckNames: string[];
}) => {
  return (
    <>
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
    </>
  );
};
