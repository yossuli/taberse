import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";

import { App } from "./App";

const rootRoute = createRootRoute({
  component: () => <App />,
});

const routeTree = rootRoute;
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
    </StrictMode>
  );
}
