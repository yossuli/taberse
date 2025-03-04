import { SignInButton, useUser } from "@clerk/clerk-react";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyRoute("/sign-in")({
  component: () => {
    const user = useUser();
    const navigate = useNavigate();
    console.log("user", user);
    if (user.isSignedIn) {
      navigate({ to: ".." });
    }
    return (
      <>
        <h1>Sign In</h1>
        <SignInButton />
      </>
    );
  },
});
