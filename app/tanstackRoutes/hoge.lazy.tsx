import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/hoge")({
  component: () => {
    return <div>Hoge</div>;
  },
});
