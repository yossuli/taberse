import { css } from "@ss/css";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelInput = ({
  register,
  label,
  type = "text",
  className,
}: {
  register: UseFormRegisterReturn;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}) => (
  <React.Fragment>
    <label htmlFor={register.name}>{label}</label>
    <input
      type={type}
      id={register.name}
      {...register}
      className={
        className ??
        css({
          width: "100%",
          gridColumn: "2/-1",
        })
      }
    />
  </React.Fragment>
);
