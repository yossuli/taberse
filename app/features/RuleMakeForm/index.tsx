import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import { Deck } from "./Deck";
import { DefaultHand } from "./DefaultHand";
import { Description } from "./Description";
import { Dice } from "./Dice";
import { FieldAreas } from "./FieldArea";
import { Players } from "./Players";
import { Roles } from "./Roles";
import { Title } from "./Title";
import { Turn } from "./Turn";
import { RankingBy } from "./RankingBy";

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
      <Players {...ruleMakeForm} />
      <hr />
      <Roles {...ruleMakeForm} />
      <hr />
      <Turn {...ruleMakeForm} />
      <hr />
      <Deck {...ruleMakeForm} />
      <hr />
      <DefaultHand {...ruleMakeForm} />
      <hr />
      <FieldAreas {...ruleMakeForm} />
      <hr />
      <Dice {...ruleMakeForm} />
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
