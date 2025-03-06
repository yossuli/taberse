import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import honox from "honox/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [viteReact(), TanStackRouterVite({}), tsconfigPaths()],
      build: {
        rollupOptions: {
          input: ["./app/client.tsx"],
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  }
  return {
    ssr: {
      external: [
        "react",
        "react-dom",
        "@hono/clerk-auth",
        "@prisma/client",
        "@prisma/adapter-d1",
      ],
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
      tsconfigPaths(),
    ],
  };
});
