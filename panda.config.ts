import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  strictTokens: true,
  strictPropertyValues: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {},
  outdir: "./public/static/styled-system",
  jsxFramework: "react",
});
