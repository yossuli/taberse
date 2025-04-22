import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelTextarea } from "app/components/LabelTextarea";
import type { RuleMakeFormChildrenProps } from "app/types";

export const Description = ({
  register,
  errors,
}: RuleMakeFormChildrenProps) => {
  return (
    <>
      <LabelTextarea register={register("description")} label="ルール説明" />
      <ErrorNotice>{errors.description?.message}</ErrorNotice>
    </>
  );
};
