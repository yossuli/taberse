import { css } from "@ss/css";
import type { RuleType } from "app/types";
import type { UseFormRegister } from "react-hook-form";

export const TypeSelect = ({
  register,
  index,
  isTypeFixed,
}: {
  register: UseFormRegister<RuleType>;
  index: number;
  isTypeFixed?: true;
}) => {
  return (
    <select
      {...register(`defaultHands.${index}.type`)}
      className={
        isTypeFixed &&
        css({
          gridColumnEnd: "span 2",
        })
      }
    >
      <option value="random">無作為</option>
      <option value="fixed">固定</option>
    </select>
  );
};
