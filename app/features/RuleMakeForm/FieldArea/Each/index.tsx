import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { AccordionDescription } from "app/components/AccordionDescription";
import { ErrorNotice } from "app/components/ErrorNotice";
import { GridAreaPicker } from "app/components/GridAreaPicker";
import { LabelInput } from "app/components/LabelInput";
import { LabelSelect } from "app/components/LabelSelect";
import { LabelTextarea } from "app/components/LabelTextarea";
import type { RuleMakeFormChildrenProps } from "app/types";
import { parseName } from "app/utils/parseName";
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
    name: `fieldAreas.${index}.field`,
  });
  const fields = watch(`fieldAreas.${index}.field`);
  const fieldSize = watch(`fieldAreas.${index}.fieldSize`);
  const areaIndex = fields.findIndex(({ name }) => name === areaName);
  const fieldSizeError =
    errors?.fieldAreas?.[index]?.fieldSize?.message ||
    errors?.fieldAreas?.[index]?.fieldSize?.width?.message ||
    errors?.fieldAreas?.[index]?.fieldSize?.height?.message;
  return (
    <>
      <LabelInput
        register={register(`fieldAreas.${index}.name`)}
        label="フィールド名"
      />
      <ErrorNotice>{errors?.fieldAreas?.[index]?.name?.message}</ErrorNotice>
      <Grid columns={8} gridColumn="1/-1">
        <AccordionDescription
          register={register(`fieldAreas.${index}.description`)}
        />
        <LabelInput
          register={register(`fieldAreas.${index}.fieldSize.width`, {
            valueAsNumber: true,
            onChange: () => trigger(`fieldAreas.${index}`),
          })}
          label="幅"
          className={css({ width: 14 })}
          type="number"
          gridColumnStart={2}
        />
        <LabelInput
          register={register(`fieldAreas.${index}.fieldSize.height`, {
            valueAsNumber: true,
            onChange: () => trigger(`fieldAreas.${index}`),
          })}
          label="高さ"
          className={css({ width: 14 })}
          type="number"
        />
        <LabelSelect
          label="該当ロール"
          options={roleNames}
          register={register(`fieldAreas.${index}.roleFor`)}
          className={css({ gridColumn: "" })}
        />
      </Grid>
      <ErrorNotice>{fieldSizeError}</ErrorNotice>
      <GridAreaPicker
        register={(i) =>
          register(`fieldAreas.${index}.field.${i}.name`, {
            onChange: () => trigger(`fieldAreas.${index}.field`),
            onBlur: (e) => {
              trigger(`fieldAreas.${index}.field`);
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
            name: parseName("", "FieldAreaName"),
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
              `fieldAreas.${index}.field.${areaIndex}.description`,
            )}
            className={css({
              gridColumn: "3/-1",
              gridRowStart: 5,
              width: "100%",
            })}
          />
          <LabelInput
            register={register(`fieldAreas.${index}.field.${areaIndex}.color`)}
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
            {errors?.fieldAreas?.[index]?.field?.[areaIndex]?.name?.message ||
              errors?.fieldAreas?.[index]?.field?.[areaIndex]?.area?.message}
          </ErrorNotice>
        </>
      )}
    </>
  );
};
