import { css } from "@ss/css";
import { Grid } from "@ss/jsx";
import { center } from "@ss/patterns";
import type { Area, Pos } from "app/types";
import { isInArea } from "app/utils/isInArea";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type AreaWithColor = Area & { color?: string };

export const GridAreaPicker = ({
  areas,
  append,
  remove,
  fieldSize: { x, y },
  className,
  register,
}: {
  areas: AreaWithColor[];
  append: (area: Area) => void;
  remove: (index: number) => void;
  fieldSize: Pos;
  className: string;
  register: (index: number) => UseFormRegisterReturn;
}) => {
  const [dragStart, setDragStart] = useState<Pos | null>(null);
  const [dragEnd, setDragEnd] = useState<Pos | null>(null);

  const handleMouseDown = (y: number, x: number) => {
    setDragStart({ y, x });
    setDragEnd(null);
  };

  const handleMoonMouseMove = (y: number, x: number) => {
    if (dragStart) {
      setDragEnd({ y, x });
    }
  };

  const handleMouseUp = (isSelected?: AreaWithColor) => {
    if (isSelected) {
      setDragStart(null);
      setDragEnd(null);
      return;
    }
    if (dragStart && dragEnd) {
      const t = Math.min(dragStart.y, dragEnd.y);
      const l = Math.min(dragStart.x, dragEnd.x);
      const b = Math.max(dragStart.y, dragEnd.y);
      const r = Math.max(dragStart.x, dragEnd.x);
      append({ t, l, b, r });
    }
    setDragStart(null);
    setDragEnd(null);
  };

  const isCellSelectedIndex = (
    y: number,
    x: number,
    areas: AreaWithColor[],
  ) => {
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      if (isInArea(area, { x, y })) {
        return { isSelected: area, index: i };
      }
    }
    return { isSelected: undefined, index: -1 };
  };

  return (
    <div className={className}>
      <Grid
        style={{
          gridTemplateColumns: `repeat(${x}, 1fr)`,
          aspectRatio: x / y,
        }}
      >
        {Array.from({ length: y }, (_, i) =>
          // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
          Array.from({ length: x }, (_, j) => {
            const { isSelected, index } = isCellSelectedIndex(i, j, areas);
            if (isSelected && !(isSelected.t === i && isSelected.l === j)) {
              return null;
            }
            return (
              <div
                key={`${i}-${j}`}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseMove={() => handleMoonMouseMove(i, j)}
                onMouseUp={() => handleMouseUp(isSelected)}
                className={center({
                  padding: 2,
                  width: "100%",
                  height: "100%",
                  "& > div": {
                    overflow: "hidden",
                    width: "unset!",
                  },
                  _hover: {
                    "& > div": {
                      overflow: "visible",
                      zIndex: 1,
                      width: "fit-content",
                    },
                  },
                })}
                style={{
                  backgroundColor: isSelected
                    ? (isSelected?.color ?? "var(--accent)")
                    : "white",
                  ...(isSelected && {
                    gridColumn: `${isSelected.l + 1}/${isSelected.r + 2}`,
                    gridRow: `${isSelected.t + 1}/${isSelected.b + 2}`,
                    minWidth: `${100 / x}%`,
                    minHeight: `${100 / y}%`,
                  }),
                }}
              >
                {isSelected && (
                  <Grid>
                    <input
                      {...register(index)}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <input
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(index);
                      }}
                      className={css({
                        gridColumn: "-2/-1",
                        borderColor: "black!",
                      })}
                      value="削除"
                    />
                  </Grid>
                )}
              </div>
            );
          }),
        )}
      </Grid>
    </div>
  );
};
