import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { AccordionDescription } from "app/components/AccordionDescription";
import { GridAreaPicker } from "app/components/GridAreaPicker";
import { LabelInput } from "app/components/LabelInput";
import { LabelSelect } from "app/components/LabelSelect";
import { LabelTextarea } from "app/components/LabelTextarea";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

export const Each = ({
  register,
  watch,
  control,
  index,
  roleNames,
}: RuleMakeFormChildrenProps & {
  index: number;
  roleNames: string[];
}) => {
  const [areaName, setAreaName] = useState("");
  const { append } = useFieldArray({
    control,
    name: `fieldArea.${index}.field`,
  });
  const fields = watch(`fieldArea.${index}.field`);
  const fieldSize = watch(`fieldArea.${index}.fieldSize`);
  const areaIndex = fields.findIndex(({ name }) => name === areaName);
  return (
    <>
      <LabelInput
        register={register(`fieldArea.${index}.name`)}
        label="フィールド名"
      />
      <Grid columns={8} gridColumn="1/-1">
        <AccordionDescription
          register={register(`fieldArea.${index}.description`)}
        />
        <LabelInput
          register={register(`fieldArea.${index}.fieldSize.width`, {
            valueAsNumber: true,
          })}
          label="幅"
          className={css({ width: 14 })}
          type="number"
          gridColumnStart={2}
        />
        <LabelInput
          register={register(`fieldArea.${index}.fieldSize.height`, {
            valueAsNumber: true,
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
      <GridAreaPicker
        register={(i) => register(`fieldArea.${index}.field.${i}.name`)}
        areas={fields.map(({ area: position, color }) => ({
          ...position,
          color,
        }))}
        append={(area) => {
          append({
            name: "",
            description: "",
            color: "var(--accent)",
            area,
            operableRoles: [],
            visibleRoles: [],
          });
        }}
        fieldSize={{ x: fieldSize.width, y: fieldSize.height }}
        className={css({
          gridColumn: "1/3",
          gridRow: "3/9",
          width: "100%",
          height: "100%",
        })}
      />
      <LabelSelect
        label="フィールド名"
        options={["", ...fields.map(({ name }) => name)]}
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
          <LabelSelect
            label="操作可能ロール"
            options={roleNames}
            register={register(
              `fieldArea.${index}.field.${areaIndex}.operableRoles`,
            )}
            gridColumnStart={3}
            gridColumnEnd={-1}
          />
          <LabelSelect
            label="表示ロール"
            options={roleNames}
            register={register(
              `fieldArea.${index}.field.${areaIndex}.visibleRoles`,
            )}
            gridColumnStart={3}
            gridColumnEnd={-1}
          />
        </>
      )}
    </>
  );
};
