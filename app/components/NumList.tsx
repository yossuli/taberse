import { center, flex } from "@ss/patterns";
import type { ArrayPath, FieldArrayWithId, FieldValues } from "react-hook-form";

export const NumList = <T extends FieldValues, U extends ArrayPath<T>>({
  fields,
  labels,
  upsert,
  remove,
}: {
  fields: FieldArrayWithId<T, U, "id">[];
  labels: { label: string; max: number }[];
  upsert: (label: string, num: number) => void;
  remove: (field: FieldArrayWithId<T, U, "id">[], label: string) => void;
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
        .map(({ label, max }, index) => (
          <div
            className={center({
              flexDirection: "column",
              gap: 1,
              minWidth: "fit-content",
            })}
            key={index}
          >
            <label htmlFor={label}>{label}</label>
            <select
              name={label}
              onChange={(e) => {
                if (e.target.value) {
                  upsert(label, Number(e.target.value));
                } else {
                  remove(fields, label);
                }
              }}
            >
              {Array.from({ length: max + 1 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        ))}
    </div>
  );
};
