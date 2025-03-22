import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { css } from "@ss/css";
import { Container } from "@ss/jsx";
import { center, container } from "@ss/patterns";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { mergeCn } from "app/utils/mergeCn";
import { useEffect, useState } from "react";
import { TaberseLogo } from "../components/TaberseLogo";

export const Route = createRootRoute({
  component: RootComponent,
});

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
function RootComponent() {
  const [compactMode, setCompactMode] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isSignedIn) {
      navigate({ to: "/sign-in" });
    }
  }, [navigate, user.isSignedIn]);

  return (
    <>
      {compactMode ? (
        <div
          className={css({
            position: "fixed",
            margin: "1",
            right: "0",
            top: "0",
          })}
        >
          <TaberseLogo onClick={() => setCompactMode(false)} />
        </div>
      ) : (
        <header
          className={mergeCn(
            container({
              position: "sticky",
              top: "0",
              flexDirection: "row",
              backgroundColor: "var(--bg)",
              borderBottomColor: "var(--border)",
              borderBottomStyle: "solid",
              borderBottomWidth: "1",
              gap: "2",
              zIndex: "9999",
            }),
            center,
          )}
        >
          <TaberseLogo onClick={() => setCompactMode(true)} />
          <h1
            className={css({
              marginRight: "auto",
            })}
          >
            Taberse
          </h1>
          <UserButton />
          <h5>{user?.user?.username}</h5>
          <SignedOut>ログインしていません</SignedOut>
        </header>
      )}
      <Container>
        <SignedOut>
          <Outlet />
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </Container>
    </>
  );
}
