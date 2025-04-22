import { css } from "@ss/css";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelInput = ({
  register,
  label,
  type = "text",
  className = css({
    width: "100%",
    gridColumn: "2/-1",
  }),
  gridColumnStart,
  gridColumnEnd,
}: {
  register: Partial<UseFormRegisterReturn>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  gridColumnStart?: number;
  gridColumnEnd?: number;
}) => (
  <React.Fragment>
    <label
      htmlFor={register.name}
      style={{
        gridColumnStart,
      }}
    >
      {label}
    </label>
    <input
      type={type}
      id={register.name}
      {...register}
      className={className}
      style={{
        gridColumnStart: gridColumnStart ? gridColumnStart + 1 : "",
        gridColumnEnd,
      }}
    />
  </React.Fragment>
);
