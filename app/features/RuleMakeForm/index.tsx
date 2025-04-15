import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import { Deck } from "./Deck";
import { Description } from "./Description";
import { Players } from "./Players";
import { Roles } from "./Roles";
import { Title } from "./Title";
import { Turn } from "./Turn";

export const RuleMakeForm = () => {
  const { onSubmit, ...ruleMakeForm } = useRuleMakeForm();
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
      <Title {...ruleMakeForm} />
      <Description {...ruleMakeForm} />
      <Players {...ruleMakeForm} />
      <Roles {...ruleMakeForm} />
      <Turn {...ruleMakeForm} />
      <Deck {...ruleMakeForm} />
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
