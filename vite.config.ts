import pages from "@hono/vite-cloudflare-pages";
import honox from "honox/vite";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./app/client.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  } else {
    return {
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        honox({
          devServer: {
            adapter,
            entry: "app/index.tsx",
          },
        }),
        pages({
          entry: ["app/index.tsx"],
        }),
      ],
    };
  }
});
