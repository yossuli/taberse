import { empty2False } from "app/utils/empty2False";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";

import { deepAsserted } from "app/utils/deepAsserted";
import { wrap } from "app/utils/wrap";
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

    wrap("turn?.ignoreRoles", () => {
      const outliers = objArr2StrArr(
        turn?.ignoreRoles.filter(
          ({ roleName }) => !roleNames?.includes(roleName),
        ),
        "roleName",
      );

      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("turn.ignoreRoles", outliers).roles,
        });
      }
    });

    wrap("decks[number].deck.playableRoles", () => {
      const [deckWithOutliers, index] = deepAsserted(
        findWithIndexResult(decks, ({ playableRoles }) =>
          playableRoles.some(({ roleName }) => !roleNames?.includes(roleName)),
        ),
      );
      const outliers = objArr2StrArr(
        deckWithOutliers?.playableRoles.filter(
          ({ roleName }) => !roleNames?.includes(roleName),
        ),
        "roleName",
      );

      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template(`decks[${index}].deck.playableRoles`, outliers)
            .roles,
        });
      }
    });

    wrap("defaultHands.roleFor", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(({ roleFor }) => !roleNames?.includes(roleFor)),
        "roleFor",
      );

      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.roleFor", outliers).roles,
        });
      }
    });

    wrap("fieldAreas[number].field[number].operableRoles", () => {
      const [_1, i, [_2, j, outliers]] = deepAsserted(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ operableRoles }) =>
            empty2False(
              operableRoles.filter(
                ({ roleName }) => !roleNames?.includes(roleName),
              ),
            ),
          ),
        ),
      );

      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template(
            `fieldAreas[${i}].field[${j}].operableRoles`,
            objArr2StrArr(outliers, "roleName"),
          ).roles,
        });
      }
    });

    wrap("fieldAreas[number].field[number].visibleRoles", () => {
      const [_3, i, [_4, j, outliers]] = deepAsserted(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ visibleRoles }) =>
            empty2False(
              visibleRoles.filter(
                ({ roleName }) => !roleNames?.includes(roleName),
              ),
            ),
          ),
        ),
      );

      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template(
            `fieldAreas[${i}].field[${j}].visibleRoles`,
            objArr2StrArr(outliers, "roleName"),
          ).roles,
        });
      }
    });

    wrap("defaultHands[type === random].deckFrom", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(
          ({ type, deckFrom }) =>
            type === "random" &&
            !decks.map(({ name }) => name).includes(deckFrom),
        ),
        "deckFrom",
      );
      if (outliers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.deckFrom", outliers).decks,
        });
      }
    });

    wrap("defaultHands[type === fixed].deckFrom", () => {
      const fixedDefaultHands = defaultHands.filter(
        (hand) => hand.type === "fixed",
      );
      const [{ deckFrom }, index, result] = deepAsserted(
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
        ),
      );

      if (result) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template(
            `defaultHands[${index}].cards`,
            Array.from(result),
            deckFrom,
            objArr2StrArr(
              decks.find(({ name }) => name === deckFrom)?.list,
              "name",
            )?.join(", "),
          ).deckList,
        });
      }
    });
  });
