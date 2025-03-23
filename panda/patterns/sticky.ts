import type { Config } from "@pandacss/dev";

export const sticky: Config["patterns"] = {
  sticky: {
    properties: {
      top: {
        type: "token",
        value: "sizes",
      },
    },
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity:
    transform(prop) {
      const { top, bottom, left, right, ...rest } = prop;
      const defaultValues = {
        display: "flex",
        position: "sticky",
        bg: "var(--bg)",
        borderColor: "var(--border)",
        zIndex: "9999",
        ...rest,
      };
      if (top) {
        return {
          top,
          alignItems: "center",
          borderBottomStyle: "solid",
          borderBottomWidth: "1",
          ...defaultValues,
        };
      }
      if (bottom) {
        return {
          alignItems: "center",
          bottom,
          borderTopStyle: "solid",
          borderTopWidth: "1",
          ...defaultValues,
        };
      }
      if (left) {
        return {
          left,
          borderRightStyle: "solid",
          borderRightWidth: "1",
          justifyContent: "center",
          ...defaultValues,
        };
      }
      if (right) {
        return {
          right,
          borderLeftStyle: "solid",
          borderLeftWidth: "1",
          justifyContent: "center",
          ...defaultValues,
        };
      }

      return defaultValues;
    },
  },
};
