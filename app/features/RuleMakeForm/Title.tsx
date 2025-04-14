import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";

export const Title = ({ register, errors }: RuleMakeFormChildrenProps) => {
  return (
    <>
      <label htmlFor="title">ルール名</label>
      <input type="text" id="title" {...register("name")} />
      <ErrorNotice>{errors.name?.message}</ErrorNotice>
    </>
  );
};
