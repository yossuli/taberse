import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import type { RuleMakeFormChildrenProps } from "app/types";
import { useFieldArray } from "react-hook-form";
import { Card } from "./Card";

export const List = ({
  control,
  index,
  ...ruleMakeFormProps
}: RuleMakeFormChildrenProps & {
  index: number;
}) => {
  [];
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `decks.${index}.list`,
  });
  return (
    <Grid columns={3}>
      {fields.map((field, i) => (
        <Card
          key={field.id}
          {...ruleMakeFormProps}
          index={index}
          i={i}
          field={field}
          fields={fields}
          update={update}
          remove={remove}
        />
      ))}
      <button
        id="decks.list.add"
        type="button"
        onClick={() =>
          append({
            name: "",
            categoryName: "",
            num: 1,
            description: "",
          })
        }
        className={css({
          gridColumn: "1/-1",
        })}
      >
        追加
      </button>
    </Grid>
  );
};
