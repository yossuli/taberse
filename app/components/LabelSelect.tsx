import { css } from "@ss/css";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelSelect = ({
  label,
  options,
  className = css({
    width: "100%",
    gridColumn: "2/-1",
  }),
  register,
}: {
  label: string;
  options: string[];
  className?: string;
  register: UseFormRegisterReturn;
}) => {
  return (
    <React.Fragment>
      <label htmlFor={register.name}>{label}</label>
      <select id={register.name} className={className} {...register}>
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option || "選択"}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};
