import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  strictPropertyValues: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  globalCss: {
    "h1, h2, h3, h4, h5, h6": {
      my: {
        base: "3",
        md: "6",
        lg: "8",
      },
    },
    pre: {
      overflowX: "scroll",
    },
  },
  outdir: "./app/styled-system",
  importMap: {
    css: "@ss/css",
    jsx: "@ss/jsx",
    patterns: "@ss/patterns",
  },
  jsxFramework: "react",
  patterns: {
    extend: {
      container: {
        defaultValues: {
          display: "flex",
          alignItems: "center",
        },
      },
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
    },
  },
});
