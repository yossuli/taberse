import pages from "@hono/vite-cloudflare-pages";
import honox from "honox/vite";
import adapter from "@hono/vite-dev-server/cloudflare";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [viteReact(), TanStackRouterVite({})],
      build: {
        rollupOptions: {
          input: ["./app/client.tsx"],
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
