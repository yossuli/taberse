import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const user = useUser();

  return (
    <React.Fragment>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        {user?.user?.username}
        <Outlet />
      </SignedIn>
    </React.Fragment>
  );
}
