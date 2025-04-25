import { center, flex } from "@ss/patterns";
import {
  type ArrayPath,
  type Control,
  type FieldArrayWithId,
  type FieldValues,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  useFieldArray,
} from "react-hook-form";

export const Checklist = <T extends FieldValues, U extends ArrayPath<T>>({
  control,
  labels,
  checkOn,
  checkOff,
  name,
}: {
  control: Control<T>;
  labels: string[];
  checkOn: (append: UseFieldArrayAppend<T, U>) => (value: string) => void;
  checkOff: (
    remove: UseFieldArrayRemove,
  ) => (field: FieldArrayWithId<T, U, "id">[], value: string) => void;
  name: U;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  return (
    <div
      className={flex({
        direction: "row",
        overflowX: "scroll",
        width: "100%",
        gap: "1",
        justifyContent: "space-around",
      })}
    >
      {labels
        .filter((label) => label !== "")
        .map((label, index) => (
          <div
            className={center({
              flexDirection: "column",
              gap: 1,
              minWidth: "fit-content",
            })}
            key={index}
          >
            <label htmlFor={label}>{label}</label>
            <input
              type="checkbox"
              name={label}
              onChange={(e) => {
                if (e.target.checked) {
                  checkOn(append)(label);
                } else {
                  checkOff(remove)(fields, label);
                }
              }}
            />
          </div>
        ))}
    </div>
  );
};
