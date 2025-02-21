import pages from "@hono/vite-cloudflare-pages";
import honox from "honox/vite";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import { CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY } from "./env";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./src/client.tsx",
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
            entry: "src/index.tsx",
            
          },
        }),
        pages(),
      ],
    };
  }
});
