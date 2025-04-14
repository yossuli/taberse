import { cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useState } from "react";

export const Players = ({
  register,
  trigger,
  errors,
}: RuleMakeFormChildrenProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <label htmlFor="players">プレイヤー数</label>

      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        <label htmlFor="min">最小人数</label>
        <input
          type="number"
          id="min"
          {...register("players.min", {
            valueAsNumber: true,
            onChange: () => trigger("players"),
          })}
        />
        <ErrorNotice>{errors.players?.min?.message}</ErrorNotice>
        <label htmlFor="max">最大人数</label>
        <input
          type="number"
          id="max"
          {...register("players.max", {
            valueAsNumber: true,
            onChange: () => trigger("players"),
          })}
          onBlur={() => setIsFocused(true)}
        />
        <ErrorNotice>{isFocused && errors.players?.max?.message}</ErrorNotice>
      </div>
      <ErrorNotice>
        {![errors.players?.min, errors.players?.max].some(Boolean) &&
          errors.players?.message}
      </ErrorNotice>
    </>
  );
};
