import { z } from "zod";
import { decksSchema } from "./decksSchema";
import { defaultHandsSchema } from "./defaultHandsSchema";
import { dicesSchema } from "./diceSchema";
import { fieldAreasSchema } from "./fieldAreasSchema";
import { playerSchema } from "./players";
import { rolesSchema } from "./rolesSchema";
import { turnSchema } from "./turnSchema";

export const RuleSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  player: playerSchema,
  roles: rolesSchema,
  turn: turnSchema.optional(),
  decks: decksSchema,
  defaultHands: defaultHandsSchema,
  fieldAreas: fieldAreasSchema,
  dice: dicesSchema,
  rankingBy: z.enum(["hands", "points", "manual", "none"]),
  // .refine(
  //   ({ turn, roles }) =>
  //     turn?.skipRoles.every((role) => roles.includes(role)) ?? true,
  //   ({ turn, roles }) => ({
  //     message: `${turn?.skipRoles
  //       .filter((role) => !roles.includes(role))
  //       .join(", ")} are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(
  //   ({ decks, roles }) =>
  //     decks.every((deck) =>
  //       deck.playableRoles.every((role) => roles.includes(role)),
  //     ),
  //   ({ decks, roles }) => ({
  //     message: `${decks
  //       .flatMap((deck) => deck.playableRoles)
  //       .filter((role) => !roles.includes(role))}
  //       are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(
  //   ({ defaultHand, roles }) =>
  //     defaultHand.every(({ roleFor }) => roles.includes(roleFor)),
  //   ({ defaultHand, roles }) => ({
  //     message: `${defaultHand
  //       .filter(({ roleFor }) => !roles.includes(roleFor))
  //       .map(({ roleFor }) => roleFor)
  //       .join(", ")} are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(
  //   ({ fieldArea, roles }) =>
  //     fieldArea.every(({ roleFor }) => roles.includes(roleFor)),
  //   ({ fieldArea, roles }) => ({
  //     message: `${fieldArea
  //       .filter(({ roleFor }) => !roles.includes(roleFor))
  //       .map(({ roleFor }) => roleFor)
  //       .join(", ")} are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(
  //   ({ fieldArea, roles }) =>
  //     fieldArea.every(({ field }) =>
  //       field.every(({ operableRoles }) =>
  //         operableRoles.every((role) => [...roles, "main"].includes(role)),
  //       ),
  //     ),
  //   ({ fieldArea, roles }) => ({
  //     message: `${fieldArea
  //       .flatMap(({ field }) =>
  //         field.flatMap(({ operableRoles }) => operableRoles),
  //       )
  //       .filter((role) => ![...roles, "main"].includes(role))}
  //       are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(
  //   ({ fieldArea, roles }) =>
  //     fieldArea.every(({ field }) =>
  //       field.every(({ visibleRoles }) =>
  //         visibleRoles.every((role) => [...roles, "main"].includes(role)),
  //       ),
  //     ),
  //   ({ fieldArea, roles }) => ({
  //     message: `${fieldArea
  //       .flatMap(({ field }) =>
  //         field.flatMap(({ visibleRoles }) => visibleRoles),
  //       )
  //       .filter((role) => ![...roles, "main"].includes(role))}
  //       are not in roles: ${roles.join(", ")}`,
  //   }),
  // )
  // .refine(({ defaultHand, decks }) =>
  //   defaultHand.every((defaultHandElm) => {
  //     if (defaultHandElm.type === "random") {
  //       return decks.map(({ name }) => name).includes(defaultHandElm.deckFrom);
  //     }
  //     return true;
  //   }),
  // )
  // .refine(({ defaultHand, decks }) =>
  //   defaultHand.every((defaultHandElm) => {
  //     if (defaultHandElm.type === "fixed") {
  //       const cardNames = decks
  //         .flatMap(({ deck }) => deck)
  //         .map(({ name }) => name);
  //       return defaultHandElm.cards.every((card) => cardNames.includes(card));
  //     }
  //     return true;
  //   }),
  // )
  // .refine(
  //   ({ fieldArea }) =>
  //     fieldArea.every(({ field }) =>
  //       field.every(
  //         ({ position }) => position.l < position.r && position.t < position.b,
  //       ),
  //     ),
  //   ({ fieldArea }) => ({
  //     message: `${fieldArea
  //       .flatMap(({ field }) => field.flatMap(({ position }) => position))
  //       .filter(
  //         (position) => position.l > position.r || position.t > position.b,
  //       )}
  //       are not in fieldArea: ${fieldArea.map(({ name }) => name).join(", ")}`,
  //   }),
  // );
});
