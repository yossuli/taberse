import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { css, cx } from "@ss/css";
import { Container } from "@ss/jsx";
import { center, container, sticky } from "@ss/patterns";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { TaberseLogo } from "app/components/TaberseLogo";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
function RootComponent() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isSignedIn) {
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
    </>
  );
}

// biome-ignore lint/nursery/useComponentExportOnlyModules: <explanation>
const Header = ({ username }: { username?: string | null }) => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  return (
    <header
      className={cx(
        container(),
        sticky({
          top: "0",
        }),
      )}
    >
      {
        <div
          className={center({
            transition: "all 1s",
            maxHeight: isCompactMode ? "0" : "120",
            overflow: "hidden",
            width: "100%",
            gap: "2",
          })}
        >
          <TaberseLogo />
          <h1
            className={css({
              marginRight: "auto",
            })}
          >
            Taberse
          </h1>
          <UserButton />
          <h5>{username}</h5>
          <SignedOut>ログインしていません</SignedOut>
        </div>
      }
      <div
        className={center({
          pos: "absolute",
          bottom: "-6",
          right: "0",
          height: "6",
          width: { base: "12", md: "24", lg: "32" },
          bg: "var(--border)",
          borderBottomRadius: "3",
          _after: {
            transition: "all 1s",
            content: '""',
            transform: isCompactMode ? "rotateZ(225deg)" : "rotateZ(45deg)",
            height: "6",
            width: "6",
            marginTop: isCompactMode ? "-3" : "3",
            borderRadius: "3",
            borderWidth: "5",
            borderColor: "var(--bg)",
            borderTopStyle: "solid",
            borderLeftStyle: "solid",
          },
        })}
        onClick={() => setIsCompactMode((c) => !c)}
        onKeyDown={() => setIsCompactMode((c) => !c)}
      />
    </header>
  );
};
