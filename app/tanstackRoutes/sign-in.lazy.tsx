import { SignInButton, useUser } from "@clerk/clerk-react";
import { css } from "@ss/css";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";
export const Route = createLazyRoute("/sign-in")({
  component: () => {
    const user = useUser();
    const navigate = useNavigate();
    if (user.isSignedIn) {
      navigate({ to: ".." });
    }
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>ゲームをプレイする</h2>
        <p
          className={css({
            d: "flex",
            flexWrap: "wrap",
            // },
          })}
        >
          <span>このゲームでは、</span>
          <span>ゲームの</span>
          <span>進行状況を</span>
          <span>保存、</span>
          <span>復元</span>
          <span>するために</span>
          <span>サインインが</span>
          <span>必要です。</span>
          <span>
            <br />
          </span>
          <span>サインインに</span>
          <span>用いられた</span>
          <span>情報を</span>
          <span>ゲームの</span>
          <span>作者は、</span>
          <span>進行状況を</span>
          <span>保存するためにのみ</span>
          <span>使用します。</span>
          <span>
            <br />
          </span>
          <span>認証システムとして</span>
          <span>使用している</span>
          <span>clerkの</span>
          <span>プライバシーポリシーは</span>
          <span>
            <a href="https://clerk.com/legal/privacy">こちら</a>から
          </span>
          <span>ご確認ください。</span>
          <br />
        </p>
        <SignInButton>clerk</SignInButton>
      </div>
    );
  },
});
