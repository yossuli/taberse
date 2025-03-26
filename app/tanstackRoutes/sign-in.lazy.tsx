import { SignInButton, useUser } from "@clerk/clerk-react";
import { css } from "@ss/css";
import { flex } from "@ss/patterns";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
export const Route = createLazyRoute("/sign-in")({
  component: () => {
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      if (user.isSignedIn) {
        navigate({ to: ".." });
      }
    }, [navigate, user.isSignedIn]);
    return (
      <>
        <h2>ゲームをプレイする</h2>
        <p
          className={flex({
            display: "flex",
            flexWrap: "wrap",
            "& > div": {
              w: "100%",
            },
          })}
        >
          <span>このゲームでは、</span>
          <span>ゲームの</span>
          <span>進行状況を</span>
          <span>保存、</span>
          <span>復元</span>
          <span>するために</span>
          <span>サインインが</span>
          <span>必要</span>
          <span>です。</span>
          <span className={css({ width: "100%" })} />
          <span>サインインに</span>
          <span>用いられた</span>
          <span>情報を</span>
          <span>ゲームの</span>
          <span>作者は、</span>
          <span>進行状況を</span>
          <span>保存する</span>
          <span>ために</span>
          <span>のみ</span>
          <span>使用</span>
          <span>します。</span>
          <span className={css({ width: "100%" })} />
          <span>認証システムとして</span>
          <span>使用</span>
          <span>している</span>
          <span>clerkの</span>
          <span>プライバシーポリシーは</span>
          <span>
            <a href="https://clerk.com/legal/privacy">こちら</a>
          </span>
          <span>から</span>
          <span>ご確認</span>
          <span>ください。</span>
        </p>
        <SignInButton>ログインして開始</SignInButton>
      </>
    );
  },
});
