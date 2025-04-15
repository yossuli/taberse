import { center, flex } from "@ss/patterns";
import type { ArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";

export const Checklist = <T extends FieldValues, U extends ArrayPath<T>>({
  fields,
  labels,
  append,
  remove,
}: {
  fields: FieldArrayWithId<T, U, "id">[];
  labels: string[];
  append: (label: string) => void;
  remove: (field: FieldArrayWithId<T, U, "id">[], value: string) => void;
}) => {
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
                  append(label);
                } else {
                  remove(fields, label);
                }
              }}
            />
          </div>
        ))}
    </div>
  );
};
