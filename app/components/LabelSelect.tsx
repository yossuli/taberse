import { css } from "@ss/css";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelSelect = ({
  label,
  options,
  className = css({
    width: "100%",
    gridColumn: "2/-1",
  }),
  register,
  gridColumnStart,
  gridColumnEnd,
}: {
  label: string;
  options: string[];
  className?: string;
  register: Partial<UseFormRegisterReturn>;
  gridColumnStart?: number;
  gridColumnEnd?: number;
}) => {
  return (
    <>
      <label
        htmlFor={register.name}
        style={{
          gridColumnStart,
        }}
      >
        {label}
      </label>
      <select
        id={register.name}
        className={className}
        {...register}
        style={{
          gridColumnStart: gridColumnStart ? gridColumnStart + 1 : "",
          gridColumnEnd,
        }}
      >
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option || "選択"}
          </option>
        ))}
      </select>
    </>
  );
};
