import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { css, cx } from "@ss/css";
import { Container } from "@ss/jsx";
import { center, container, sticky } from "@ss/patterns";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "app/components/Header";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
function RootComponent() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn === false) {
      navigate({ to: "/sign-in" });
    }
  }, [navigate, user.isSignedIn]);

  return (
    <>
      <Header username={user?.user?.username} />
      <Container flexDirection="column">
        <SignedOut>
          <Outlet />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </Container>
      <footer
        className={cx(container(), center(), sticky({ gap: "2", bottom: "0" }))}
      >
        <h4 className={css({ marginEnd: "2" })}>@ 2025 yossuli</h4>
        <h5>
          <a href="https://x.com/yossulito">𝕏</a>
        </h5>
        <h5>
          <a href="https://github.com/yossuli">github</a>
        </h5>
      </footer>
    </>
  );
}
