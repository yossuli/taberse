import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { App } from "./App";
import { Hoge } from "./routes/Hoge";

const rootRoute = createRootRoute({});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <App />,
});

const hogeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hoge",
  component: () => <Hoge />,
});

const routeTree = rootRoute.addChildren([indexRoute, hogeRoute]);
const router = createRouter({ routeTree });

const env = import.meta.env;

const PUBLISHABLE_KEY =
  env.MODE === "development"
    ? env.VITE_CLERK_PUBLISHABLE_KEY
    : env.CLERK_PUBLISHABLE_KEY;

console.log("env: ", import.meta.env);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </StrictMode>
  );
}
