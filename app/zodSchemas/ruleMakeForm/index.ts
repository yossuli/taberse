import { callWithIfDefine } from "app/utils/callWithIfDefine";
import { emptyIter2Null } from "app/utils/emptyIter2Null";
import { findWithIndexResult } from "app/utils/findWithIndex";
import { objArr2StrArr } from "app/utils/objArr2StrArr";
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
      targetProp: string[],
      ...opt: (string | undefined)[]
    ) => ({
      roles: `${targetPropName} (${targetProp.join(", ")}) are not in roles (${roleNames.join(", ")})`,
      decks: `${targetPropName} (${targetProp.join(", ")}) are not in decks (${deckNames.join(", ")})`,
      deckList: `${targetPropName} (${targetProp.join(", ")}) are not in decks: ${opt[0]} (${opt[1]})`,
    });

    wrap("ignoreRolesがrolesに含まれているか", () => {
      if (!turn) {
        return;
      }
      const outliers = objArr2StrArr(
        turn.ignoreRoles.filter(
          ({ roleName }) => !roleNames.includes(roleName),
        ),
        "roleName",
      );

      if (outliers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("turn.ignoreRoles", outliers).roles,
        });
      }
    });

    wrap("deck.playableRolesがrolesに含まれているか", () => {
      callWithIfDefine(
        findWithIndexResult(decks, ({ playableRoles }) =>
          emptyIter2Null(
            playableRoles.filter(
              ({ roleName }) => !roleNames?.includes(roleName),
            ),
          ),
        ),
        ([_, index, outliers]) => {
          if (outliers) {
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

    wrap("defaultHands.roleForがrolesに含まれているか", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(({ roleFor }) => !roleNames.includes(roleFor)),
        "roleFor",
      );

      if (outliers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.roleFor", outliers).roles,
        });
      }
    });

    wrap("field.operableRolesがrolesに含まれているか", () => {
      callWithIfDefine(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ operableRoles }) =>
            emptyIter2Null(
              operableRoles.filter(
                ({ roleName }) => !roleNames.includes(roleName),
              ),
            ),
          ),
        ),
        ([_1, i, [_2, j, outliers]]) => {
          if (outliers) {
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

    wrap("field.visibleRolesがrolesに含まれているか", () => {
      callWithIfDefine(
        findWithIndexResult(fieldAreas, ({ field }) =>
          findWithIndexResult(field, ({ visibleRoles }) =>
            emptyIter2Null(
              visibleRoles.filter(
                ({ roleName }) => !roleNames.includes(roleName),
              ),
            ),
          ),
        ),
        ([_1, i, [_2, j, outliers]]) => {
          if (outliers) {
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

    wrap("defaultHands.deckFromがdeck.nameに含まれているか", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(
          ({ deckFrom }) => !decks.map(({ name }) => name).includes(deckFrom),
        ),
        "deckFrom",
      );

      if (outliers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.deckFrom", outliers).decks,
        });
      }
    });

    wrap("defaultHands.roleForがrole.nameに含まれているか", () => {
      const outliers = objArr2StrArr(
        defaultHands.filter(
          ({ roleFor }) => !roles.map(({ name }) => name).includes(roleFor),
        ),
        "roleFor",
      );

      if (outliers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: template("defaultHands.roleFor", outliers).roles,
        });
      }
    });

    wrap("defaultHands[type=fixed].cards", () => {
      const fixedDefaultHands = defaultHands.filter(
        (hand) => hand.type === "fixed",
      );
      wrap("cardsがすべてdecks[name=deckFrom].listに含まれているか", () => {
        const result = (
          a: string[],
          b: string[] | undefined,
        ): [string[], string[] | undefined] | undefined => {
          const diff = a.filter((x) => !b?.includes(x));
          return (!!diff?.length || undefined) && [diff, b];
        };

        callWithIfDefine(
          findWithIndexResult(fixedDefaultHands, ({ deckFrom, cards }) => {
            const deckList = decks.find(({ name }) => name === deckFrom)?.list;
            if (!deckList) {
              return undefined;
            }
            return result(
              objArr2StrArr(cards, "name"),
              objArr2StrArr(deckList, "name"),
            );
          }),
          ([{ deckFrom }, index, [outliers, deckList]]) => {
            if (outliers) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: template(
                  `defaultHands[${index}].cards`,
                  outliers,
                  deckFrom,
                  deckList.join(", "),
                ).deckList,
              });
            }
          },
        );
      });
      wrap(
        "cards*roleFor.numが固定しているカードの枚数に収まっているか",
        () => {
          type Result = (
            name: string,
            num: number,
            deckFrom: string,
            roleFor: string,
          ) =>
            | [
                { name: string; num: number },
                string,
                number,
                { roleFor: string; roleNum: number },
              ]
            | undefined;

          const result: Result = (name, num, deckFrom, roleFor) => {
            const deck = decks.find(
              ({ name: deckName }) => deckName === deckFrom,
            );
            const c = roles.find(({ name }) => name === roleFor)?.num;
            const a = deck?.list.find(
              ({ name: cardName }) => cardName === name,
            )?.num;

            const [cardLimit, roleNum] = [a, c].filter((x) => x !== undefined);

            if (cardLimit >= num * roleNum) {
              return undefined;
            }
            return [{ name, num }, deckFrom, cardLimit, { roleFor, roleNum }];
          };
          callWithIfDefine(
            findWithIndexResult(
              fixedDefaultHands,
              ({ roleFor, cards, deckFrom }) =>
                findWithIndexResult(cards, ({ name, num }) =>
                  result(name, num, deckFrom, roleFor),
                ),
            ),
            ([_1, i, [_2, j, result]]) => {
              const [{ name, num }, deckName, cardLimit, { roleFor, roleNum }] =
                result;
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `defaultHands[${i}].cards[${j}].name (${name}) is ${deckName}: ${name} (${cardLimit}) < card: ${name} (${num}) * ${roleFor} (${roleNum})`,
              });
            },
          );
        },
      );
    });
  });
