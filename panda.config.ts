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
    },
  },
});
