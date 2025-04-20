import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { ErrorNotice } from "app/components/ErrorNotice";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useFieldArray } from "react-hook-form";
import { Each } from "./Each";

export const FieldArea = ({
  errors,
  register,
  control,
  watch,
  trigger,
}: RuleMakeFormChildrenProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "fieldArea",
  });
  const roleNames = watch("roles")?.map(({ name }) => name);
  return (
    <>
      <label htmlFor="fieldArea">プレイフィールド</label>
      <Grid columns={4}>
        {fields.map((_, index) => (
          <Each
            key={index}
            register={register}
            index={index}
            roleNames={roleNames}
            watch={watch}
            control={control}
            trigger={trigger}
            errors={errors}
          />
        ))}
        <ErrorNotice>{errors.fieldArea?.root?.message}</ErrorNotice>
        <button
          type="button"
          className={css({
            gridColumn: "1/-1",
          })}
          onClick={() =>
            append({
              name: "",
              description: "",
              roleFor: "",
              fieldSize: {
                width: 0,
                height: 0,
              },
              field: [],
            })
          }
        >
          追加
        </button>
      </Grid>
    </>
  );
};
