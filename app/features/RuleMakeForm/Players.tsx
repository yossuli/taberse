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
      <label htmlFor="player">プレイヤー数</label>
      <Grid>
        <LabelInput
          label="最小人数"
          type="number"
          register={register("player.min", {
            valueAsNumber: true,
            onChange: () => trigger("player"),
          })}
        />
        <ErrorNotice>{errors.player?.min?.message}</ErrorNotice>
        <LabelInput
          label="最大人数"
          type="number"
          register={register("player.max", {
            valueAsNumber: true,
            onChange: () => trigger("player"),
            onBlur: () => setIsFocused(true),
          })}
        />
        <ErrorNotice>{isFocused && errors.player?.max?.message}</ErrorNotice>
      </Grid>
      <ErrorNotice>
        {![errors.player?.min, errors.player?.max].some(Boolean) &&
          errors.player?.message}
      </ErrorNotice>
    </>
  );
};
