import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { AccordionDescription } from "app/components/AccordionDescription";
import { ErrorNotice } from "app/components/ErrorNotice";
import { GridAreaPicker } from "app/components/GridAreaPicker";
import { LabelInput } from "app/components/LabelInput";
import { LabelSelect } from "app/components/LabelSelect";
import { LabelTextarea } from "app/components/LabelTextarea";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { OperableRoles } from "./OperableRoles";
import { VisibleRoles } from "./VisibleRoles";

export const Each = ({
  register,
  trigger,
  watch,
  control,
  errors,
  index,
  roleNames,
}: RuleMakeFormChildrenProps & {
  index: number;
  roleNames: string[];
}) => {
  const [areaName, setAreaName] = useState("");
  const { append, remove } = useFieldArray({
    control,
    name: `fieldArea.${index}.field`,
  });
  const fields = watch(`fieldArea.${index}.field`);
  const fieldSize = watch(`fieldArea.${index}.fieldSize`);
  const areaIndex = fields.findIndex(({ name }) => name === areaName);
  const fieldSizeError =
    errors?.fieldArea?.[index]?.fieldSize?.message ||
    errors?.fieldArea?.[index]?.fieldSize?.width?.message ||
    errors?.fieldArea?.[index]?.fieldSize?.height?.message;
  return (
    <>
      <LabelInput
        register={register(`fieldArea.${index}.name`)}
        label="フィールド名"
      />
      <ErrorNotice>{errors?.fieldArea?.[index]?.name?.message}</ErrorNotice>
      <Grid columns={8} gridColumn="1/-1">
        <AccordionDescription
          register={register(`fieldArea.${index}.description`)}
        />
        <LabelInput
          register={register(`fieldArea.${index}.fieldSize.width`, {
            valueAsNumber: true,
            onChange: () => trigger(`fieldArea.${index}`),
          })}
          label="幅"
          className={css({ width: 14 })}
          type="number"
          gridColumnStart={2}
        />
        <LabelInput
          register={register(`fieldArea.${index}.fieldSize.height`, {
            valueAsNumber: true,
            onChange: () => trigger(`fieldArea.${index}`),
          })}
          label="高さ"
          className={css({ width: 14 })}
          type="number"
        />
        <LabelSelect
          label="該当ロール"
          options={roleNames}
          register={register(`fieldArea.${index}.roleFor`)}
          className={css({ gridColumn: "" })}
        />
      </Grid>
      <ErrorNotice>{fieldSizeError}</ErrorNotice>
      <GridAreaPicker
        register={(i) =>
          register(`fieldArea.${index}.field.${i}.name`, {
            onChange: () => trigger(`fieldArea.${index}.field`),
            onBlur: (e) => {
              trigger(`fieldArea.${index}.field`);
              setAreaName(e.target.value);
            },
          })
        }
        areas={fields.map(({ area: position, color }) => ({
          ...position,
          color,
        }))}
        append={(area) => {
          append({
            name: "",
            description: "",
            color: "",
            area,
            operableRoles: [],
            visibleRoles: [],
          });
        }}
        remove={remove}
        fieldSize={{ x: fieldSize.width, y: fieldSize.height }}
        className={css({
          gridColumn: "1/3",
          gridRowStart: fieldSizeError ? 4 : 3,
          gridRowEnd: fieldSizeError ? 10 : 9,
          width: "100%",
          height: "100%",
        })}
      />
      <LabelSelect
        label="フィールド名"
        options={["", ...fields.map(({ name }) => name).filter(Boolean)]}
        register={{
          onChange: async (e) => setAreaName(e.target.value),
          name: "fieldName",
        }}
        gridColumnStart={3}
      />
      {areaName && (
        <>
          <LabelTextarea
            label="説明"
            register={register(
              `fieldArea.${index}.field.${areaIndex}.description`,
            )}
            className={css({
              gridColumn: "3/-1",
              gridRowStart: 5,
              width: "100%",
            })}
          />
          <LabelInput
            register={register(`fieldArea.${index}.field.${areaIndex}.color`)}
            label="フィールドの色"
            type="color"
            className={css({ width: 14, gridColumn: "-2/-1" })}
            gridColumnStart={3}
          />
          <OperableRoles
            control={control}
            index={index}
            areaIndex={areaIndex}
            roleNames={roleNames}
          />
          <VisibleRoles
            control={control}
            index={index}
            areaIndex={areaIndex}
            roleNames={roleNames}
          />
          <ErrorNotice>
            {errors?.fieldArea?.[index]?.field?.[areaIndex]?.name?.message ||
              errors?.fieldArea?.[index]?.field?.[areaIndex]?.area?.message}
          </ErrorNotice>
        </>
      )}
    </>
  );
};
