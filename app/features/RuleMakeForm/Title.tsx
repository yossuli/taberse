import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";

export const Title = ({ register, errors }: RuleMakeFormChildrenProps) => {
  return (
    <>
      <LabelInput label="ルール名" register={register("name")} />
      <ErrorNotice>{errors.name?.message}</ErrorNotice>
    </>
  );
};
