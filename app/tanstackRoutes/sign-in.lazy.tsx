import { SignInButton, useUser } from "@clerk/clerk-react";
import { css } from "@ss/css";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { container } from "../../public/static/styled-system/patterns";
export const Route = createLazyRoute("/sign-in")({
  component: () => {
    const user = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      console.log(user.isSignedIn);
      if (user.isSignedIn) {
        navigate({ to: ".." });
      }
    }, [navigate, user.isSignedIn]);
    return (
      <div className={container()}>
        <h2>ゲームをプレイする</h2>
        <p
          className={css({
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
          <div />
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
          <div />
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
      </div>
    );
  },
});
