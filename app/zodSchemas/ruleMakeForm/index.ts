import { empty2False } from "app/utils/empty2False";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
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
  .superRefine(({ turn, roles, decks, defaultHands, fieldAreas }, ctx) => {
    const roleNames = objArr2StrArr(roles, "name");
    const deckNames = objArr2StrArr(decks, "name");
    const template = (
      targetPropName: string,
      targetProp?: string[],
      ...opt: (string | undefined)[]
    ) => ({
      roles: `${targetPropName} (${targetProp?.join(", ")}) are not in roles (${roleNames?.join(", ")})`,
      decks: `${targetPropName} (${targetProp?.join(", ")}) are not in decks (${deckNames?.join(", ")})`,
      deckList: `${targetPropName} (${targetProp?.join(", ")}) are not in decks: ${opt[0]} (${opt[1]})`,
    });

    // turn?.ignoreRoles
    const failedIgnoreRoleNames = objArr2StrArr(
      turn?.ignoreRoles.filter(
        ({ roleName }) => !roleNames?.includes(roleName),
      ),
      "roleName",
    );
    if (failedIgnoreRoleNames?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template("turn.ignoreRoles", failedIgnoreRoleNames).roles,
      });
    }

    // decks[number].deck.playableRoles
    const [failedDeck, failedDeckIndex] =
      findWithIndexResult(decks, ({ playableRoles }) =>
        playableRoles.some(({ roleName }) => !roleNames?.includes(roleName)),
      ) ?? [];
    const failedDeckPlayableRoles = objArr2StrArr(
      failedDeck?.playableRoles.filter(
        ({ roleName }) => !roleNames?.includes(roleName),
      ),
      "roleName",
    );
    if (failedDeckPlayableRoles?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template(
          `decks[${failedDeckIndex}].deck.playableRoles`,
          failedDeckPlayableRoles,
        ).roles,
      });
    }

    // defaultHands.roleFor
    const failedDefaultHands = objArr2StrArr(
      defaultHands.filter(({ roleFor }) => !roleNames?.includes(roleFor)),
      "roleFor",
    );
    if (failedDefaultHands?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template("defaultHands.roleFor", failedDefaultHands).roles,
      });
    }

    // fieldAreas[number].field[number].operableRoles
    const [_1, failedFieldAreaIndex, failedFieldAreaResult] =
      findWithIndexResult(fieldAreas, ({ field }) =>
        findWithIndexResult(field, ({ operableRoles }) =>
          empty2False(
            operableRoles.filter(
              ({ roleName }) => !roleNames?.includes(roleName),
            ),
          ),
        ),
      ) ?? [];
    const [_2, failedFieldIndex, failedOperableRoles] =
      failedFieldAreaResult ?? [];
    if (failedOperableRoles) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template(
          `fieldAreas[${failedFieldAreaIndex}].field[${failedFieldIndex}].operableRoles`,
          objArr2StrArr(failedOperableRoles, "roleName"),
        ).roles,
      });
    }

    // fieldAreas[number].field[number].visibleRoles
    const [_3, failedVisibleRolesFieldAreaIndex, failedVisibleRolesResult] =
      findWithIndexResult(fieldAreas, ({ field }) =>
        findWithIndexResult(field, ({ visibleRoles }) =>
          empty2False(
            visibleRoles.filter(
              ({ roleName }) => !roleNames?.includes(roleName),
            ),
          ),
        ),
      ) ?? [];
    const [_4, failedVisibleRolesFieldIndex, failedVisibleRoles] =
      failedVisibleRolesResult ?? [];
    if (failedVisibleRoles) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template(
          `fieldAreas[${failedVisibleRolesFieldAreaIndex}].field[${failedVisibleRolesFieldIndex}].visibleRoles`,
          objArr2StrArr(failedVisibleRoles, "roleName"),
        ).roles,
      });
    }

    // defaultHands[type === random].deckFrom
    const failedDeckFrom = objArr2StrArr(
      defaultHands.filter(
        ({ type, deckFrom }) =>
          type === "random" &&
          !decks.map(({ name }) => name).includes(deckFrom),
      ),
      "deckFrom",
    );
    if (failedDeckFrom?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template("defaultHands.deckFrom", failedDeckFrom).decks,
      });
    }

    // defaultHands[type === fixed].deckFrom
    const fixedDefaultHands = defaultHands.filter(
      (hand) => hand.type === "fixed",
    );
    const [failedFixedDefaultHands, failedFixedDefaultHandsIndex, failedCards] =
      findWithIndexResult(fixedDefaultHands, ({ deckFrom, cards }) =>
        empty2False(
          new Set(objArr2StrArr(cards, "name")).difference(
            new Set(
              objArr2StrArr(
                decks.find(({ name }) => name === deckFrom)?.list,
                "name",
              ),
            ),
          ),
        ),
      ) ?? [];
    const { deckFrom } = failedFixedDefaultHands ?? {};
    if (failedCards) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: template(
          `defaultHands[${failedFixedDefaultHandsIndex}].cards`,
          Array.from(failedCards),
          deckFrom,
          decks
            .find(({ name }) => name === deckFrom)
            ?.list.map(({ name }) => name)
            .join(", "),
        ).deckList,
      });
    }
  });
