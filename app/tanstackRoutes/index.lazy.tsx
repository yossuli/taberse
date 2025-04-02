import type { JsonValue } from "@prisma/client/runtime/library";
import { css, cx } from "@ss/css";
import { Br } from "@ss/jsx";
import { flex } from "@ss/patterns";
import { createLazyRoute } from "@tanstack/react-router";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import type { Routes } from "../.hc.type";

const client = hc<Routes>("");

export const Route = createLazyRoute("/")({
  component: () => {
    return (
      <>
        <h1 className={css({ lineHeight: "1.4 !important" })}>
          ようこそ <mark>Taberse</mark> へ!!
        </h1>
        <Notice />
        <h2>ルームを作成する</h2>
        <form action="/" method="post">
          <label htmlFor="passphrase">
            <h4>あいことばを入力してください</h4>
          </label>
          <input type="text" id="passphrase" />
          <label htmlFor="rules">
            <h4>ルールを選択してください</h4>
          </label>
          <Rules />
          <button type="submit">作成</button>
        </form>
        <h2>ルールを作成する</h2>
        <form action="/" method="post">
          <label htmlFor="title">
            <h4>ルールのタイトルを入力してください</h4>
          </label>
          <input type="text" id="title" />
          <h4>ルールの詳細を入力してください</h4>
          <button type="submit">作成</button>
        </form>
        <h2>ルームを検索する</h2>
        <form action="/" method="post">
          <label htmlFor="passphrase">
            <h4>あいことばを入力してください</h4>
          </label>
          <div>
            <input type="text" id="passphrase" />
            <button type="submit">入室</button>
          </div>
        </form>
      </>
    );
  },
});

const Notice = () => {
  return (
    <p
      className={cx(
        flex({
          display: "flex",
          flexWrap: "wrap",
          marginTop: "0!",
          "& > div": {
            w: "100%",
          },
        }),
        "notice",
      )}
    >
      <span>ここでは、</span>
      <span>現実世界で</span>
      <span>ボードゲームを</span>
      <span>遊ぶ</span>
      <span>ように</span>
      <span>自由に</span>
      <span>ルールを</span>
      <span>決めて</span>
      <span>遊ぶことが</span>
      <span>できます。</span>
      <Br />
      <span>この</span> <span>Taberse</span> <span>は、</span>
      <span>ルールの</span>
      <span>検証を</span>
      <span>行いません。</span>
      <Br />
      <span>プレイヤーの</span>
      <span>皆さんは</span>
      <span>外部ツールで</span>
      <span>コミュニケーションを</span>
      <span>取りながら</span>
      <span>ルールを</span>
      <span>守って</span>
      <span>遊んで</span>
      <span>ください。</span>
      <Br />
      {/* <button
        type="button"
        className={float({
          position: "absolute",
          right: "0",
          top: "0",
          w: "8",
          aspectRatio: "1/1",
          "&::after, &::before": {
            position: "absolute",
            content: "''",
            w: "8",
            h: "1",
            bg: "var(--bg)",
            zIndex: -1,
            transform: "translate(-50%,-50%) rotate(45deg)",
            borderRadius: "2",
          },
          "&::before": {
            transform: "translate(-50%,-50%) rotate(-45deg)",
          },
        })}
      /> */}
    </p>
  );
};

const Rules = () => {
  const [rules, setRules] = useState<
    {
      title: string;
      rule: JsonValue;
    }[]
  >([]);
  useEffect(() => {
    const fetchRules = async () => {
      const res = await client.api.test.game.$get();
      const data = await res.json();
      setRules(data.games);
    };
    fetchRules();
  }, []);
  return (
    <select name="rules" id="rules">
      {rules.map((rule) => (
        <option key={rule.title} value={rule.title}>
          {rule.title}
        </option>
      ))}
    </select>
  );
};
