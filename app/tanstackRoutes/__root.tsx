import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    fetch("/api/test/auth")
      .then((res) => res.json())
      .then((data) => {
        setAuth(data.auth);
      });
  }, []);
  return (
    <React.Fragment>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Outlet />
    </React.Fragment>
  );
}
