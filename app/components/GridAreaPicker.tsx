import { Grid } from "@ss/jsx";
import { flex } from "@ss/patterns";
import { useState } from "react";
import type {
  ArrayPath,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

export const GridAreaPicker = <T extends FieldValues, U extends ArrayPath<T>>({
  areas,
  append,
  fieldSize: { x, y },
  className,
  register,
}: {
  areas: {
    t: number;
    l: number;
    b: number;
    r: number;
    color: string;
  }[];
  append: (position: { t: number; l: number; b: number; r: number }) => void;
  fieldSize: {
    x: number;
    y: number;
  };
  className: string;
  register: (index: number) => UseFormRegisterReturn;
}) => {
  const [dragStart, setDragStart] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ row: number; col: number } | null>(
    null,
  );

  const handleMouseDown = (row: number, col: number) => {
    setDragStart({ row, col });
    setDragEnd(null);
  };

  const handleMoonMouseMove = (row: number, col: number) => {
    if (dragStart) {
      setDragEnd({ row, col });
    }
  };

  const handleMouseUp = () => {
    if (dragStart && dragEnd) {
      const t = Math.min(dragStart.row, dragEnd.row);
      const l = Math.min(dragStart.col, dragEnd.col);
      const b = Math.max(dragStart.row, dragEnd.row);
      const r = Math.max(dragStart.col, dragEnd.col);
      append({ t, l, b, r });
    }
    setDragStart(null);
    setDragEnd(null);
  };

  const isCellSelectedIndex = (
    row: number,
    col: number,
    areas: {
      t: number;
      l: number;
      b: number;
      r: number;
      color?: string;
    }[],
  ) => {
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      if (
        [area.t <= row, area.l <= col, area.b >= row, area.r >= col].every(
          Boolean,
        )
      ) {
        return { isSelected: area, index: i };
      }
    }
    return { isSelected: undefined, index: -1 };
  };

  return (
    <Grid
      className={className}
      style={{
        gridTemplateColumns: `repeat(${x}, 1fr)`,
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
              onMouseUp={handleMouseUp}
              className={flex({
                width: "100%",
                height: "100%",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: isSelected ? undefined : 1,
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
                <input
                  {...register(index)}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              )}
            </div>
          );
        }),
      )}
    </Grid>
  );
};
