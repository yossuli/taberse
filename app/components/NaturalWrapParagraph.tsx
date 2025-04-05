import { cx } from "@ss/css";
import { Br } from "@ss/jsx";
import { flex } from "@ss/patterns";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  paragraph: ReactNode[][];
  className?: string;
};

export const NaturalWrapParagraph = ({ paragraph, className }: Props) => {
  return (
    <p
      className={cx(
        flex({
          display: "flex",
          flexWrap: "wrap",
          "& > div": {
            w: "100%",
          },
          "& > span": {
            minWidth: "1",
          },
        }),
        className,
      )}
    >
      {paragraph.map((sentence, j) => (
        <React.Fragment key={j}>
          {sentence.map((text, i) => (
            <span key={`${j}-${i}-${text}`}>{text}</span>
          ))}
          <Br key={`${j}-00`} />
        </React.Fragment>
      ))}
    </p>
  );
};
