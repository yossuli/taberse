import { SignInButton, useUser } from "@clerk/clerk-react";
import { createLazyRoute, useNavigate } from "@tanstack/react-router";
import { NaturalWrapParagraph } from "app/components/NaturalWrapParagraph";
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
        <NaturalWrapParagraph
          // biome-ignore format: sentence want to be a single line
          paragraph={[
            ["このゲームでは、", "ゲームの", "進行状況を", "保存、", "復元", "するために", "サインインが", "必要", "です。"],
            ["サインインに", "用いられた", "情報を", "ゲームの", "作者は、", "進行状況を", "保存する", "ために", "のみ", "使用", "します。"],
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            ["認証システムとして", "使用", "している", "clerkの", "プライバシーポリシーは", <a href="https://clerk.com/legal/privacy">こちら</a>, "から", "ご確認", "ください。"],
          ]}
        />
        <SignInButton>ログインして開始</SignInButton>
      </>
    );
  },
});
