import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
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
      <Grid>
        <LabelInput
          label="最小人数"
          type="number"
          register={register("players.min", {
            valueAsNumber: true,
            onChange: () => trigger("players"),
          })}
        />
        <ErrorNotice>{errors.players?.min?.message}</ErrorNotice>
        <LabelInput
          label="最大人数"
          type="number"
          register={register("players.max", {
            valueAsNumber: true,
            onChange: () => trigger("players"),
            onBlur: () => setIsFocused(true),
          })}
        />
        <ErrorNotice>{isFocused && errors.players?.max?.message}</ErrorNotice>
      </Grid>
      <ErrorNotice>
        {![errors.players?.min, errors.players?.max].some(Boolean) &&
          errors.players?.message}
      </ErrorNotice>
    </>
  );
};
