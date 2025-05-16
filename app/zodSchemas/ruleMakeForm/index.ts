import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";

import { avoidAssignErrors } from "app/utils/avoidAssignErrors";
import { deepEmpty2Null } from "app/utils/deepEmpty2Null";
import { emptyIter2Null } from "app/utils/emptyIter2Null";
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

      if (outliers?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("turn.ignoreRoles", outliers).roles,
        });
      }
    });

    wrap("decks[number].deck.playableRoles", () => {
      avoidAssignErrors(
        findWithIndexResult(decks, ({ playableRoles }) =>
          emptyIter2Null(
            playableRoles.filter(
              ({ roleName }) => !roleNames?.includes(roleName),
            ),
          ),
        ),
        { 1: 0, 2: [{ roleName: "" }] },
        ({ 1: index, 2: outliers }) => {
          if (deepEmpty2Null(outliers)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: template(
                `decks[${index}].deck.playableRoles`,
                objArr2StrArr(outliers, "roleName"),
              ).roles,
            });
          }
        },
      );
    });

    wrap("defaultHands.roleFor", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(({ roleFor }) => !roleNames?.includes(roleFor)),
        "roleFor",
      );

      if (outliers?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.roleFor", outliers).roles,
        });
      }
    });

    wrap("fieldAreas[number].field[number].operableRoles", () => {
      avoidAssignErrors(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ operableRoles }) =>
            emptyIter2Null(
              operableRoles.filter(
                ({ roleName }) => !roleNames?.includes(roleName),
              ),
            ),
          ),
        ),
        { 1: 0, 2: { 1: 0, 2: [{ roleName: "" }] } },
        ({ 1: i, 2: { 1: j, 2: outliers } }) => {
          if (deepEmpty2Null(outliers)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: template(
                `fieldAreas[${i}].field[${j}].operableRoles`,
                objArr2StrArr(outliers, "roleName"),
              ).roles,
            });
          }
        },
      );
    });

    wrap("fieldAreas[number].field[number].visibleRoles", () => {
      avoidAssignErrors(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ visibleRoles }) =>
            emptyIter2Null(
              visibleRoles.filter(
                ({ roleName }) => !roleNames?.includes(roleName),
              ),
            ),
          ),
        ),
        { 1: 0, 2: { 1: 0, 2: [{ roleName: "" }] } },
        ({ 1: i, 2: { 1: j, 2: outliers } }) => {
          if (deepEmpty2Null(outliers)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: template(
                `fieldAreas[${i}].field[${j}].visibleRoles`,
                objArr2StrArr(outliers, "roleName"),
              ).roles,
            });
          }
        },
      );
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

      if (outliers?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.deckFrom", outliers).decks,
        });
      }
    });

    wrap("defaultHands[type === fixed].deckFrom", () => {
      const result = (a: string[] | undefined, b: string[] | undefined) => {
        const diff = a?.filter((x) => !b?.includes(x));
        return (!!diff?.length || undefined) && { 0: diff, 1: b };
      };
      const fixedDefaultHands = defaultHands.filter(
        (hand) => hand.type === "fixed",
      );

      avoidAssignErrors(
        findWithIndexResult(fixedDefaultHands, ({ deckFrom, cards }) =>
          result(
            objArr2StrArr(cards, "name"),
            objArr2StrArr(
              decks.find(({ name }) => name === deckFrom)?.list,
              "name",
            ),
          ),
        ),
        { 0: { deckFrom: "" }, 1: 0, 2: { 0: [""], 1: [""] } },
        ({ 0: { deckFrom }, 1: index, 2: { 0: outliers, 1: deckList } }) => {
          if (deepEmpty2Null(outliers)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: template(
                `defaultHands[${index}].cards`,
                outliers,
                deckFrom,
                deckList?.join(", "),
              ).deckList,
            });
          }
        },
      );
    });
  });
