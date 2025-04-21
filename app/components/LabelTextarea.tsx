import { css } from "@ss/css";
import type { UseFormRegisterReturn } from "react-hook-form";

export const LabelTextarea = ({
  register,
  label,
  className,
  gridColumnStart,
  gridColumnEnd,
}: {
  register: UseFormRegisterReturn;
  label: string;
  className?: string;
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
      <textarea
        id={register.name}
        {...register}
        className={
          className ??
          css({
            width: "100%",
            gridColumn: "2/-1",
            display: "flex",
          })
        }
        style={{
          gridColumnStart: gridColumnStart ? gridColumnStart + 1 : "",
          gridColumnEnd,
        }}
      />
    </>
  );
};
