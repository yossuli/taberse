import { ErrorNotice } from "app/components/ErrorNotice";
import { LabelInput } from "app/components/LabelInput";
import type { RuleMakeFormChildrenProps } from "app/types";

export const Title = ({
  register,
  trigger,
  errors,
}: RuleMakeFormChildrenProps) => {
  return (
    <>
      <LabelInput
        label="ルール名"
        register={register("name", {
          onChange: () => trigger("name"),
        })}
      />
      <ErrorNotice>{errors.name?.message}</ErrorNotice>
    </>
  );
};
