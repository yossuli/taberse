import type { RuleType } from "app/types";
import type { UseFormRegister } from "react-hook-form";

export const ImportDeckSelect = ({
  register,
  deckNames,
  index,
}: {
  register: UseFormRegister<RuleType>;
  deckNames: string[];
  index: number;
}) => {
  return (
    <select {...register(`defaultHand.${index}.deckFrom`)}>
      {deckNames?.map((deckName, i) => (
        <option key={i} value={deckName}>
          {deckName}
        </option>
      ))}
    </select>
  );
};
