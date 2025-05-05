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
        .reduce(
          (prev, curr) =>
            roles.map(({ name }) => name).includes(curr.roleName)
              ? prev
              : `${prev}, ${curr.roleName}`,
          "",
        )
        .slice(
          2,
        )}) are not in roles (${roles.reduce((prev, curr) => `${prev}, ${curr.name}`, "").slice(2)})`,
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
      message: `decks[${decks.findIndex(({ playableRoles }) =>
        playableRoles.some(
          (role) => !roles.map((role) => role.name).includes(role.roleName),
        ),
      )}].deck.playableRoles (${(
        decks.find(({ playableRoles }) =>
          playableRoles.some(
            (role) => !roles.map((role) => role.name).includes(role.roleName),
          ),
        )?.playableRoles ?? []
      )
        .reduce(
          (prev, { roleName }) =>
            roles.map((role) => role.name).includes(roleName)
              ? prev
              : `${prev}, ${roleName}`,
          "",
        )
        .slice(2)}) are not in roles (${roles
        .reduce((prev, curr) => `${prev}, ${curr.name}`, "")
        .slice(2)})`,
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
        )}) are not in roles (${roles.reduce((prev, curr) => `${prev}, ${curr.name}`, "").slice(2)})`,
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
      message: `fieldAreas[${fieldAreas.findIndex(({ field }) =>
        field.find(({ operableRoles }) =>
          operableRoles.some(
            ({ roleName }) => !roles.map(({ name }) => name).includes(roleName),
          ),
        ),
      )}].field[${fieldAreas
        .find(({ field }) =>
          field.find(({ operableRoles }) =>
            operableRoles.some(
              ({ roleName }) =>
                !roles.map(({ name }) => name).includes(roleName),
            ),
          ),
        )
        ?.field.findIndex(({ operableRoles }) =>
          operableRoles.some(
            ({ roleName }) => !roles.map(({ name }) => name).includes(roleName),
          ),
        )}].operableRoles (${(
        fieldAreas
          .find(({ field }) =>
            field.find(({ operableRoles }) =>
              operableRoles.some(
                ({ roleName }) =>
                  !roles.map(({ name }) => name).includes(roleName),
              ),
            ),
          )
          ?.field.find(({ operableRoles }) =>
            operableRoles.some(
              ({ roleName }) =>
                !roles.map(({ name }) => name).includes(roleName),
            ),
          )?.operableRoles ?? []
      )
        .reduce(
          (prev, { roleName }) =>
            roles.map(({ name }) => name).includes(roleName)
              ? prev
              : `${prev}, ${roleName}`,
          "",
        )
        .slice(
          2,
        )}) are not in roles (${roles.map(({ name }) => name).join(", ")})`,
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
      message: `fieldAreas[${fieldAreas.findIndex(({ field }) =>
        field.find(({ visibleRoles }) =>
          visibleRoles.some(
            ({ roleName }) => !roles.map(({ name }) => name).includes(roleName),
          ),
        ),
      )}].field[${fieldAreas
        .find(({ field }) =>
          field.find(({ visibleRoles }) =>
            visibleRoles.some(
              ({ roleName }) =>
                !roles.map(({ name }) => name).includes(roleName),
            ),
          ),
        )
        ?.field.findIndex(({ visibleRoles }) =>
          visibleRoles.some(
            ({ roleName }) => !roles.map(({ name }) => name).includes(roleName),
          ),
        )}].visibleRoles (${(
        fieldAreas
          .find(({ field }) =>
            field.find(({ visibleRoles }) =>
              visibleRoles.some(
                ({ roleName }) =>
                  !roles.map(({ name }) => name).includes(roleName),
              ),
            ),
          )
          ?.field.find(({ visibleRoles }) =>
            visibleRoles.some(
              ({ roleName }) =>
                !roles.map(({ name }) => name).includes(roleName),
            ),
          )?.visibleRoles ?? []
      )
        .reduce(
          (prev, { roleName }) =>
            roles.map(({ name }) => name).includes(roleName)
              ? prev
              : `${prev}, ${roleName}`,
          "",
        )
        .slice(
          2,
        )}) are not in roles (${roles.map(({ name }) => name).join(", ")})`,
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
      defaultHands.find(
        (defaultHandsElm) =>
          defaultHandsElm.type === "fixed" &&
          defaultHandsElm.cards.some(
            (card) =>
              !decks
                .find(({ name }) => name === defaultHandsElm.deckFrom)
                ?.list.map(({ name }) => name)
                .includes(card.name),
          ),
      ) === undefined,
    ({ defaultHands, decks }) => ({
      message: `defaultHands.cards (${(
        defaultHands.find(
          (defaultHandsElm) =>
            defaultHandsElm.type === "fixed" &&
            defaultHandsElm.cards.some(
              (card) =>
                !decks
                  .find(({ name }) => name === defaultHandsElm.deckFrom)
                  ?.list.map(({ name }) => name)
                  .includes(card.name),
            ),
        ) as { cards: { name: string; num: number }[]; deckFrom: string }
      )?.cards
        .reduce(
          (prev, { name }) =>
            decks
              .find(
                ({ name }) =>
                  name ===
                  defaultHands.find(
                    (defaultHandsElm) =>
                      defaultHandsElm.type === "fixed" &&
                      defaultHandsElm.cards.some(
                        (card) =>
                          !decks
                            .find(
                              ({ name }) => name === defaultHandsElm.deckFrom,
                            )
                            ?.list.map(({ name }) => name)
                            .includes(card.name),
                      ),
                  )?.deckFrom,
              )
              ?.list.map(({ name }) => name)
              .includes(name)
              ? prev
              : `${prev}, ${name}`,
          "",
        )
        .slice(2)}) are not in decks: ${
        defaultHands.find(
          (defaultHandsElm) =>
            defaultHandsElm.type === "fixed" &&
            defaultHandsElm.cards.some(
              (card) =>
                !decks
                  .find(({ name }) => name === defaultHandsElm.deckFrom)
                  ?.list.map(({ name }) => name)
                  .includes(card.name),
            ),
        )?.deckFrom
      } (${decks
        .find(
          ({ name }) =>
            name ===
            defaultHands.find(
              (defaultHandsElm) =>
                defaultHandsElm.type === "fixed" &&
                defaultHandsElm.cards.some(
                  (card) =>
                    !decks
                      .find(({ name }) => name === defaultHandsElm.deckFrom)
                      ?.list.map(({ name }) => name)
                      .includes(card.name),
                ),
            )?.deckFrom,
        )
        ?.list.map(({ name }) => name)
        .join(", ")})`,
    }),
  );
