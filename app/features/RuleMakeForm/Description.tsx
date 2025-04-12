import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";

export const Description = ({
  register,
  errors,
}: RuleMakeFormChildrenProps) => {
  return (
    <>
      <label htmlFor="description">ルール説明</label>
      <textarea id="description" {...register("description")} />
      {errors.description && (
        <ErrorNotice>errors.description.message;</ErrorNotice>
      )}
    </>
  );
};
