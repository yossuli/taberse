import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
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
  }, [user.isSignedIn, navigate]);

  return (
    <>
      <SignedOut>
        <Outlet />
      </SignedOut>
      <SignedIn>
        {compactMode ? (
          <div style={{ position: "fixed", margin: "1rem", right: 0, top: 0 }}>
            <TaberseLogo onClick={() => setCompactMode(false)} />
          </div>
        ) : (
          <header
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "var(--bg)",
              padding: "0.67rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h1
              style={{
                display: "flex",
                flexGrow: 1,
              }}
            >
              <TaberseLogo onClick={() => setCompactMode(true)} />
              <div style={{ width: "1rem" }} />
              Taberse
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <UserButton />
              <h5
                style={{
                  marginLeft: "1rem",
                }}
              >
                {user?.user?.username}
              </h5>
            </div>
          </header>
        )}
        <Outlet />
      </SignedIn>
    </>
  );
}
