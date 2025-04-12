import { css, cx } from "@ss/css";
import { grid } from "@ss/patterns";
import { ErrorNotice } from "app/components/ErrorNotice";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Description } from "./Description";
import { Players } from "./Players";
import { Roles } from "./Roles";
import { Title } from "./Title";

export const RuleMakeForm = () => {
  const { control, register, trigger, onSubmit, errors } = useRuleMakeForm();
  const rolesFieldsArray = useFieldArray({
    control,
    name: "roles",
  });
  const { fields: rolesFields, append } = rolesFieldsArray;
  const {
    fields: turnIgnoreFields,
    append: append1,
    remove: remove1,
    update: update1,
  } = useFieldArray({
    control,
    name: "turn.ignoreRoles",
  });
  console.log("error", errors);

  return (
    <form
      onSubmit={onSubmit}
      className={grid({
        columns: 2,
        "& > label::after": {
          content: "'　：'",
        },
      })}
    >
      <Title register={register("name")} errors={errors} />
      <Description register={register("description")} errors={errors} />
      <Players
        registerMin={register("players.min", {
          valueAsNumber: true,
          onChange: () => trigger("players"),
        })}
        registerMax={register("players.max", {
          valueAsNumber: true,
          onChange: () => trigger("players"),
        })}
        errors={errors}
      />
      <Roles
        fieldArrayMethod={rolesFieldsArray}
        errors={errors}
        trigger={trigger}
        register={register}
      />
      <label htmlFor="turn">ターン</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        {rolesFields.filter((r) => (r.name ?? "") !== "").length > 0 && (
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
                      update1(index, { roleName: e.target.value });
                      trigger("turn.ignoreRoles", {
                        shouldFocus: true,
                      });
                    }}
                  >
                    <option value="">なし</option>
                    {rolesFields.map((field) => (
                      <option key={field.id} value={field.name}>
                        {field.name}
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
                  append1({ roleName: "" });
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
      <label htmlFor="decks">デッキ</label>
      <div
        className={cx(
          grid({
            columns: 2,
          }),
        )}
      >
        {rolesFields.map((field, index) => (
          <React.Fragment key={field.id}>
            <input
              {...register(`decks.${index}.name`)}
              onChange={(e) => {
                update(index, e.target.value);
                trigger("decks", {
                  shouldFocus: true,
                });
              }}
            />
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>
            {errors.decks?.[index] && (
              <ErrorNotice>{errors.decks[index].message}</ErrorNotice>
            )}
            <div
              className={css({
                gridColumn: "1/3",
              })}
            >
              {}
            </div>
          </React.Fragment>
        ))}
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

        {errors.decks?.root && (
          <ErrorNotice>{errors.decks.root.message}</ErrorNotice>
        )}
      </div>
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
