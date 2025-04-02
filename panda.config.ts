import { defineConfig } from "@pandacss/dev";
import { sticky } from "panda/patterns/sticky";

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
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      w: "fit-content",
      "& > div": {
        display: "flex",
        flexDirection: "row",
        gap: "2",
      },
    },
    button: {
      width: "fit-content",
      margin: "auto",
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
      ...sticky,
      br: {
        transform() {
          return {
            w: "100%",
          };
        },
        jsxElement: "span",
      },
    },
  },
});
