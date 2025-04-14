import { center, flex } from "@ss/patterns";
import type { ArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";

export const Checklists = <T extends FieldValues, U extends ArrayPath<T>>({
  field,
  labels,
  append,
  remove,
}: {
  field: FieldArrayWithId<T, U, "id">[];
  labels: { id: string; label: string }[];
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
        .filter(({ label }) => label !== "")
        .map(({ label, id }, index) => (
          <div
            className={center({
              flexDirection: "column",
              gap: 1,
              minWidth: "fit-content",
            })}
            key={id}
          >
            <label htmlFor={label}>{label}</label>
            <input
              type="checkbox"
              {...field[index]}
              name={label}
              onChange={(e) => {
                if (e.target.checked) {
                  append(label);
                } else {
                  remove(field, label);
                }
              }}
            />
          </div>
        ))}
    </div>
  );
};
