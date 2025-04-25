import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import { Decks } from "./Decks";
import { DefaultHands } from "./DefaultHands";
import { Description } from "./Description";
import { Dices } from "./Dices";
import { FieldAreas } from "./FieldArea";
import { Player } from "./Player";
import { RankingBy } from "./RankingBy";
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
      <hr />
      <Description {...ruleMakeForm} />
      <hr />
      <Player {...ruleMakeForm} />
      <hr />
      <Roles {...ruleMakeForm} />
      <hr />
      <Turn {...ruleMakeForm} />
      <hr />
      <Decks {...ruleMakeForm} />
      <hr />
      <DefaultHands {...ruleMakeForm} />
      <hr />
      <FieldAreas {...ruleMakeForm} />
      <hr />
      <Dices {...ruleMakeForm} />
      <hr />
      <RankingBy {...ruleMakeForm} />
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
