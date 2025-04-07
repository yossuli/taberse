import type { JsonValue } from "@prisma/client/runtime/library";
import { css, cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { createLazyRoute } from "@tanstack/react-router";
import { useZValidateForm } from "app/hooks/useZValidateForm";
import { RuleSchema } from "app/zodSchemas";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import React from "react";
import { useFieldArray } from "react-hook-form";
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
const RuleMakeForm = () => {
  const { control, register, trigger, onSubmit, errors } =
    useZValidateForm(RuleSchema);
  const {
    fields: rolesFields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "roles",
  });
  const {
    fields: turnIgnoreFields,
    append: append1,
    remove: remove1,
    update: update1,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "turn.ignoreRoles",
  });

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("fields", rolesFields);
  console.log("turnIgnoreFields", turnIgnoreFields);
  console.error("errors", errors);
  return (
    <form
      onSubmit={onSubmit((data) => {
        console.log("data", data);
        client.api.test.game.$post(
          {
            json: data,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      })}
      className={grid({
        columns: 2,
        "& > label::after": {
          content: "'　：'",
        },
      })}
    >
      <label htmlFor="title">ルール名</label>
      <input type="text" id="title" {...register("name")} />
      {errors.name && <ErrorNotice>{errors.name.message}</ErrorNotice>}
      <label htmlFor="description">ルール説明</label>
      <textarea id="description" {...register("description")} />
      {errors.description && (
        <ErrorNotice>{errors.description.message}</ErrorNotice>
      )}
      <label htmlFor="players">プレイヤー数</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        <label htmlFor="min">最小人数</label>
        <input
          type="number"
          id="min"
          {...register("players.min", {
            valueAsNumber: true,
            onChange: () =>
              trigger("players", {
                shouldFocus: true,
              }),
          })}
        />
        {errors.players?.min && (
          <ErrorNotice>{errors.players.min.message}</ErrorNotice>
        )}
        <label htmlFor="max">最大人数</label>
        <input
          type="number"
          id="max"
          {...register("players.max", {
            valueAsNumber: true,
            onChange: () => trigger("players"),
          })}
        />
        {errors.players?.max && (
          <ErrorNotice>{errors.players.max.message}</ErrorNotice>
        )}
      </div>
      {![errors.players?.min, errors.players?.max].some(Boolean) &&
        errors.players && <ErrorNotice>{errors.players.message}</ErrorNotice>}
      <label htmlFor="roles">ロール</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        <div className={css({ gridColumn: "1/3" })}>
          {rolesFields.map((field, index) => (
            <div
              key={field.id}
              className={cx(
                grid({
                  columns: 2,
                }),
              )}
            >
              <input
                {...register(`roles.${index}`)}
                onChange={(e) => {
                  update(index, e.target.value);
                  trigger("roles", {
                    shouldFocus: true,
                  });
                }}
              />
              <button type="button" onClick={() => remove(index)}>
                削除
              </button>
              {errors.roles?.[index] && (
                <ErrorNotice>{errors.roles[index].message}</ErrorNotice>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className={css({
            gridColumn: "1/3",
          })}
          onClick={() => {
            append("");
          }}
        >
          追加
        </button>
        {errors.roles?.root && (
          <ErrorNotice>{errors.roles.root.message}</ErrorNotice>
        )}
      </div>
      <label htmlFor="turn">ターン</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        {rolesFields.filter((r) => (r[0] ?? "") !== "").length > 0 && (
          <>
            <label htmlFor="turn.skipRoles">スキップするロール</label>
            <div
              className={cx(
                grid({
                  columns: 2,
                }),
              )}
            >
              {turnIgnoreFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <select
                    id={`turn.ignoreRoles.${index}`}
                    {...register(`turn.ignoreRoles.${index}`)}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        remove1(index);
                        return;
                      }
                      update1(index, e.target.value);
                      trigger("turn.ignoreRoles", {
                        shouldFocus: true,
                      });
                    }}
                  >
                    <option value="">なし</option>
                    {rolesFields.map((field) => (
                      // @ts-ignore
                      <option key={field.id} value={field[0]}>
                        {/* @ts-ignore */}
                        {field[0]}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => remove1(index)}>
                    削除
                  </button>
                  {errors.turn?.ignoreRoles?.[index] && (
                    <ErrorNotice>
                      {errors.turn.ignoreRoles[index].message}
                    </ErrorNotice>
                  )}
                </React.Fragment>
              ))}
              <button
                type="button"
                className={css({
                  gridColumn: "1/3",
                })}
                onClick={() => {
                  append1("");
                }}
              >
                追加
              </button>
            </div>
            {errors.turn?.ignoreRoles?.root && (
              <ErrorNotice>{errors.turn.ignoreRoles.root.message}</ErrorNotice>
            )}
          </>
        )}
        <label htmlFor="turn.turnTimeLimit">ターン制限時間</label>
        <input
          type="number"
          id="turn.turnTimeLimit"
          {...register("turn.turnTimeLimit.time", {
            valueAsNumber: true,
          })}
        />
        {errors.turn?.turnTimeLimit?.time && (
          <ErrorNotice>{errors.turn.turnTimeLimit.time.message}</ErrorNotice>
        )}
        <label htmlFor="turn.turnTimeLimit.type">
          制限時間のターン終了時の扱い
        </label>
        <select
          id="turn.turnTimeLimit.type"
          {...register("turn.turnTimeLimit.type")}
        >
          <option value="persistent">持続</option>
          <option value="reset">リセット</option>
        </select>
      </div>
      {errors.turn && !errors.turn?.ignoreRoles && (
        <ErrorNotice>{errors.turn.message}</ErrorNotice>
      )}

      <button
        type="submit"
        className={css({
          gridColumn: "1/3",
        })}
      >
        作成
      </button>
    </form>
  );
};

const ErrorNotice = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cx(
        css({
          gridColumn: "1/3",
          marginY: "0!",
          bg: "red.700!",
          borderColor: "red.200!",
        }),
        "notice",
      )}
    >
      {children}
    </div>
  );
};
