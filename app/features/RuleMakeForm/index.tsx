import { css } from "@ss/css";
import { grid } from "@ss/patterns";
import { useRuleMakeForm } from "app/hooks/useRuleMakeForm.ts";
import { useFieldArray } from "react-hook-form";
import { Deck } from "./Deck";
import { Description } from "./Description";
import { Players } from "./Players";
import { Roles } from "./Roles";
import { Title } from "./Title";
import { Turn } from "./Turn";

export const RuleMakeForm = () => {
  const { control, onSubmit, ...ruleMakeForm } = useRuleMakeForm();
  const rolesFieldsArray = useFieldArray({
    control,
    name: "roles",
  });
  const { fields: rolesFields } = rolesFieldsArray;
  const turnIgnoreFieldsArray = useFieldArray({
    control,
    name: "turn.ignoreRoles",
  });
  const decksFieldsArray = useFieldArray({
    control,
    name: "decks",
  });

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
      <Roles fieldArrayMethod={rolesFieldsArray} {...ruleMakeForm} />
      <Turn
        {...ruleMakeForm}
        fieldArrayMethod={turnIgnoreFieldsArray}
        rolesFields={rolesFields}
      />
      <Deck
        {...ruleMakeForm}
        control={control}
        deckFieldArray={decksFieldsArray}
        rolesFields={rolesFields}
      />
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
