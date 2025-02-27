import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate, Outlet, createRootRoute } from "@tanstack/react-router";
import { TaberseLogo } from "../components/TaberseLogo";

export const Route = createRootRoute({
  component: RootComponent,
});

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
function RootComponent() {
  const user = useUser();
  if (!user.isSignedIn) {
    Navigate({ to: "/sign-in" });
  }

  return (
    <>
      <SignedOut>
        <Outlet />
      </SignedOut>
      <SignedIn>
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
            <TaberseLogo />
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
        <Outlet />
      </SignedIn>
    </>
  );
}
