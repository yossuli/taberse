import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/fuga")({
  component: () => {
    return <div>Fuga</div>;
  },
});
