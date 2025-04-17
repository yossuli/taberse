import { css } from "@ss/css";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export const AccordionDescription = ({
  register,
}: {
  register: UseFormRegisterReturn;
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  return (
    <>
      <label
        htmlFor={register.name}
        className={css({
          display: "flex!",
          flexDirection: "row",
          alignItems: "center",
          gap: "4px",
        })}
        onClick={() => setIsOpenDescription((prev) => !prev)}
        onKeyDown={() => setIsOpenDescription((prev) => !prev)}
      >
        説明
        <div
          className={css({
            display: "flex",
            width: "20px",
            height: "20px",
            border: "10px solid #0000",
            borderLeft: "10px solid var(--text)",
            transform: isOpenDescription ? "rotate(90deg) translateX(25%)" : "",
            transition: "transform 0.2s ease-in-out",
          })}
        />
      </label>
      {isOpenDescription && (
        <textarea
          {...register}
          id={register.name}
          className={css({
            gridColumn: "2/-1",
          })}
        />
      )}
    </>
  );
};
