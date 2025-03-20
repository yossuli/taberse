import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  strictPropertyValues: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {},
  outdir: "./app/styled-system",
  jsxFramework: "react",
  patterns: {
    extend: {
      container: {
        defaultValues: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
    },
  },
});
