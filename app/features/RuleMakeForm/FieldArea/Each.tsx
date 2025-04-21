import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { AccordionDescription } from "app/components/AccordionDescription";
import { GridAreaPicker } from "app/components/GridAreaPicker";
import { LabelInput } from "app/components/LabelInput";
import { LabelSelect } from "app/components/LabelSelect";
import { LabelTextarea } from "app/components/LabelTextarea";
import type { RuleMakeFormChildrenProps } from "app/types";
import { fakeRegister } from "app/utils/fakeRegister";
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
  const { append, remove } = useFieldArray({
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
        className={css({ gridColumn: "2/-1", width: "100%" })}
      />
      <label htmlFor="">該当ロール</label>
      <select
        {...register(`fieldArea.${index}.roleFor`)}
        className={css({
          gridColumn: "2/-1",
          width: "100%",
        })}
      >
        {roleNames.map((name, i) => (
          <option value={name} key={i}>
            {name}
          </option>
        ))}
      </select>
      <div
        className={grid({
          gridColumn: "1/-1",
          width: "100%",
          columns: 6,
        })}
      >
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
        />
        <LabelInput
          register={register(`fieldArea.${index}.fieldSize.height`, {
            valueAsNumber: true,
          })}
          label="高さ"
          className={css({ width: 14 })}
          type="number"
        />
        <button type="button" onClick={() => remove(index)}>
          削除
        </button>
      </div>
      <GridAreaPicker
        register={(i) => register(`fieldArea.${index}.field.${i}.name`)}
        areas={fields.map(({ area: position, color }) => ({
          ...position,
          color,
        }))}
        append={(area): void => {
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
          gridRow: "4/9",
        })}
      />
      <LabelSelect
        label="フィールド名"
        options={["", ...fields.map(({ name }) => name)]}
        register={{
          ...fakeRegister,
          onChange: async (e) => setAreaName(e.target.value),
          name: "fieldName",
        }}
        className={css({ gridColumn: "3/-1" })}
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
              gridRowStart: 7,
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
        </>
      )}
    </>
  );
};
