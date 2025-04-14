import { css } from "@ss/css";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelInput = ({
  register,
  label,
  type = "text",
}: {
  register: UseFormRegisterReturn;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}) => (
  <React.Fragment>
    <label htmlFor={register.name}>{label}</label>
    <input
      type={type}
      id={register.name}
      {...register}
      className={css({
        width: "100%",
      })}
    />
  </React.Fragment>
);
