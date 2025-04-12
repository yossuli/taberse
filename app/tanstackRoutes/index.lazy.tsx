import type { JsonValue } from "@prisma/client/runtime/library";
import { createLazyRoute } from "@tanstack/react-router";
import { RuleMakeForm } from "app/features/RuleMakeForm";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import type { Routes } from "../.hc.type";

const client = hc<Routes>("");

export const Route = createLazyRoute("/")({
  component: () => {
    return (
      <>
        {/* <h1 className={css({ lineHeight: "1.4 !important" })}>
          ようこそ <mark>Taberse</mark> へ!!
        </h1>
        <NaturalWrapParagraph
          className={cx(flex({ marginTop: "0!" }), "notice")}
          // biome-ignore format: sentence want to be a single line
          paragraph={[
            ["ここでは、", "現実世界で", "ボードゲームを", "遊ぶ", "ように", "自由に", "ルールを", "決めて", "遊ぶことが", "できます。"],
            ["この", " ", "Taberse", " ", "は、", "ルールの", "検証を", "行いません。"],
            ["プレイヤーの", "皆さんは", "外部ツールで", "コミュニケーションを", "取りながら", "ルールを", "守って", "遊んで", "ください。"],
          ]}
        />
        <h2>ルームを作成する</h2>
        <form action="/" method="post">
          <label htmlFor="roomMakePassphrase">
            <h4>あいことばを入力してください</h4>
          </label>
          <input type="text" id="roomMakePassphrase" />
          <label htmlFor="rules">
            <h4>ルールを選択してください</h4>
          </label>
          <Rules />
          <button type="submit">作成</button>
        </form> */}
        <h2>ルールを作成する</h2>
        <RuleMakeForm />
        <h2>ルームを検索する</h2>
        <form action="/" method="post">
          <label htmlFor="roomJoinPassphrase">
            <h4>あいことばを入力してください</h4>
          </label>
          <div>
            <input type="text" id="roomJoinPassphrase" />
            <button type="submit">入室</button>
          </div>
        </form>
      </>
    );
  },
});

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
