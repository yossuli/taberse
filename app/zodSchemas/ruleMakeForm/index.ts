import { z } from "zod";
import { decksSchema } from "./decksSchema";
import { defaultHandsSchema } from "./defaultHandsSchema";
import { dicesSchema } from "./diceSchema";
import { fieldAreasSchema } from "./fieldAreasSchema";
import { playerSchema } from "./playerSchema";
import { rolesSchema } from "./rolesSchema";
import { turnSchema } from "./turnSchema";

export const RuleSchema = z
  .object({
    name: z.string().min(1),
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
  .refine(
    ({ turn, roles }) =>
      turn?.ignoreRoles.every(({ roleName }) =>
        roles.find((role) => role.name === roleName),
      ) ?? true,
    ({ turn, roles }) => ({
      message: `turn.ignoreRoles (${turn?.ignoreRoles
        .filter(({ roleName }) => !roles.find((role) => role.name === roleName))
        .join(
          ", ",
        )}) are not in roles (${roles.reduce((prev, curr) => `${prev}, ${curr.name}`, "")})`,
    }),
  )
  .refine(
    ({ decks, roles }) =>
      decks.every((deck) =>
        deck.playableRoles.every(({ roleName }) =>
          roles.find((role) => role.name === roleName),
        ),
      ),
    ({ decks, roles }) => ({
      message: `decks.index.deck.playableRoles (${decks
        .flatMap((deck) => deck.playableRoles)
        .map((deck) => deck.roleName)
        .filter((roleName) => !roles.find((role) => role.name === roleName))
        .join(
          ", ",
        )}) are not in roles (${roles.reduce((prev, curr) => `${prev}, ${curr.name}`, "")})`,
    }),
  )
  .refine(
    ({ defaultHands, roles }) =>
      defaultHands.every(({ roleFor }) =>
        roles.find((role) => role.name === roleFor),
      ),
    ({ defaultHands, roles }) => ({
      message: `defaultHands.roleFor (${defaultHands
        .map(({ roleFor }) => roleFor)
        .filter((roleFor) => !roles.find((role) => role.name === roleFor))
        .join(
          ", ",
        )}) are not in roles (${roles.reduce((prev, curr) => `${prev}, ${curr.name}`, "")})`,
    }),
  )
  .refine(
    ({ fieldAreas, roles }) =>
      fieldAreas.every(({ field }) =>
        field.every(({ operableRoles }) =>
          operableRoles.every(({ roleName }) =>
            roles.find((role) => role.name === roleName),
          ),
        ),
      ),
    ({ fieldAreas, roles }) => ({
      message: `fieldAreas.index.field.operableRoles (${fieldAreas
        .flatMap(({ field }) =>
          field.flatMap(({ operableRoles }) => operableRoles),
        )
        .filter(({ roleName }) =>
          roles.find((role) => role.name !== roleName),
        )}) are not in roles: ${roles.join(", ")}`,
    }),
  )
  .refine(
    ({ fieldAreas, roles }) =>
      fieldAreas.every(({ field }) =>
        field.every(({ visibleRoles }) =>
          visibleRoles.every(({ roleName }) =>
            roles.find((role) => role.name === roleName),
          ),
        ),
      ),
    ({ fieldAreas, roles }) => ({
      message: `${fieldAreas
        .flatMap(({ field }) =>
          field.flatMap(({ visibleRoles }) => visibleRoles),
        )
        .filter(({ roleName }) => roles.find((role) => role.name !== roleName))}
      are not in roles (${roles.join(", ")})`,
    }),
  )
  .refine(
    ({ defaultHands, decks }) =>
      defaultHands.every((defaultHandsElm) => {
        if (defaultHandsElm.type === "random") {
          return decks
            .map(({ name }) => name)
            .includes(defaultHandsElm.deckFrom);
        }
        return true;
      }),
    ({ defaultHands, decks }) => ({
      message: `defaultHands.deckFrom (${defaultHands
        .filter((defaultHandsElm) => defaultHandsElm.type === "random")
        .map((defaultHandsElm) => defaultHandsElm.deckFrom)
        .filter((deckFrom) => !decks.map(({ name }) => name).includes(deckFrom))
        .join(
          ", ",
        )}) are not in decks (${decks.map(({ name }) => name).join(", ")})`,
    }),
  )
  .refine(
    ({ defaultHands, decks }) =>
      defaultHands.every((defaultHandsElm) => {
        if (defaultHandsElm.type === "fixed") {
          const cardNames = (
            decks.find(({ name }) => name === defaultHandsElm.deckFrom)?.list ??
            []
          ).map(({ name }) => name);
          return defaultHandsElm.cards.every((card) =>
            cardNames.find((name) => name !== card.name),
          );
        }
        return true;
      }),
    ({ defaultHands, decks }) => ({
      message: `defaultHands.cards (${defaultHands
        .filter((defaultHandsElm) => defaultHandsElm.type === "fixed")
        .map((defaultHandsElm) =>
          defaultHandsElm.cards
            .map((card) => card.name)
            .filter(
              (cardName) =>
                !decks
                  .find(({ name }) => name === defaultHandsElm.deckFrom)
                  ?.list.map(({ name }) => name)
                  .includes(cardName),
            )
            .join(", "),
        )
        .join(
          "\n",
        )}) are not in decks (${decks.map(({ name }) => name).join(", ")})`,
    }),
  );
