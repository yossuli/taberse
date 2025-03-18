import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { css } from "@ss/css";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { flex } from "../../public/static/styled-system/patterns";
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
          className={flex({
            position: "sticky",
            top: "0",
            p: "3 0",
            backgroundColor: "var(--bg)",
            justify: "space-between",
            borderBottomColor: "var(--border)",
            borderBottomStyle: "solid",
            borderBottomWidth: "1",
          })}
        >
          <h1
            className={flex({
              align: "center",
              flexGrow: 1,
            })}
          >
            <TaberseLogo onClick={() => setCompactMode(true)} />
            <div className={css({ width: "3" })} />
            Taberse
          </h1>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
            })}
          >
            <UserButton />
            <h5
              className={css({
                marginLeft: "1",
              })}
            >
              {user?.user?.username}
            </h5>
            <SignedOut>ログインしていません</SignedOut>
          </div>
        </header>
      )}
      <SignedOut>
        <Outlet />
      </SignedOut>
      <SignedIn>
        <Outlet />
      </SignedIn>
    </>
  );
}
