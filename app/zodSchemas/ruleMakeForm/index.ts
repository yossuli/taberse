import { conditionalSequence } from "app/utils/conditionalSequence";
import { nameBranding } from "app/utils/nameBranding";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
import { z } from "zod";
import { decksSchema } from "./decks";
import { defaultHandsSchema } from "./defaultHands";
import { dicesSchema } from "./dices";
import { fieldAreasSchema } from "./fieldAreas";
import { playerSchema } from "./player";
import { deckPlayableRoles } from "./refine/deckPlayableRoles";
import { defaultHandsDeckFromInDecks } from "./refine/defaultHandsDeckFromInDecks";
import { defaultHandsFixedCardsInDeckList } from "./refine/defaultHandsFixedCardsInDeckList";
import { defaultHandsFixedCardsNumLimit } from "./refine/defaultHandsFixedCardsNumLimit";
import { defaultHandsRoleFor } from "./refine/defaultHandsRoleFor";
import { defaultHandsRoleForInRoles } from "./refine/defaultHandsRoleForInRoles";
import { fieldOperableRoles } from "./refine/fieldOperableRoles";
import { fieldVisibleRoles } from "./refine/fieldVisibleRoles";
import { ignoreRoles } from "./refine/ignoreRoles";
import { rolesSchema } from "./roles";
import { turnSchema } from "./turn";

export const RuleSchema = z
  .object({
    name: nameBranding("RuleName"),
    description: z.string(),
    player: playerSchema,
    roles: rolesSchema,
    turn: turnSchema.optional(),
    decks: decksSchema,
    defaultHands: defaultHandsSchema,
    fieldAreas: fieldAreasSchema,
    dices: dicesSchema,
    rankingBy: z.enum(["hands", "points", "manual", "none"]),
  })
  .superRefine(({ turn, roles, decks, defaultHands, fieldAreas }, ctx) => {
    const roleNames = objArr2StrArr(roles, "name");
    const deckNames = objArr2StrArr(decks, "name");

    ignoreRoles(turn, roleNames, ctx);
    deckPlayableRoles(decks, roleNames, ctx);
    defaultHandsRoleFor(defaultHands, roleNames, ctx);
    fieldOperableRoles(fieldAreas, roleNames, ctx);
    fieldVisibleRoles(fieldAreas, roleNames, ctx);

    conditionalSequence(
      () => defaultHandsRoleForInRoles(defaultHands, roles, ctx),
      () => defaultHandsDeckFromInDecks(defaultHands, decks, deckNames, ctx),
      () => {
        const fixedDefaultHands = defaultHands.filter(
          (hand) => hand.type === "fixed",
        );
        conditionalSequence(
          () => defaultHandsFixedCardsInDeckList(fixedDefaultHands, decks, ctx),
          () =>
            defaultHandsFixedCardsNumLimit(
              fixedDefaultHands,
              decks,
              roles,
              ctx,
            ),
        );
      },
    );
  });

export type RuleSchema = z.infer<typeof RuleSchema>;
