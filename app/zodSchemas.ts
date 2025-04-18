import { z } from "zod";

export const RuleSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  players: z
    .object({
      min: z.number().int().min(1),
      max: z.number().int().min(1),
    })
    .refine(({ min, max }) => min <= max, {
      message: "min must be less than or equal to max",
    }),
  roles: z
    .array(z.object({ name: z.string().min(1) }))
    .nonempty()
    .superRefine((roles, ctx) => {
      roles.forEach((role, index) => {
        if (
          roles.filter((_, i) => i !== index).find((r) => r.name === role.name)
        ) {
          ctx.addIssue({
            message: `Role "${role.name}" is duplicated`,
            code: z.ZodIssueCode.custom,
            path: [index, "name"],
          });
        }
      });
    }),
  turn: z
    .object({
      ignoreRoles: z
        .array(z.object({ roleName: z.string() }))
        .superRefine((ignoreRoles, ctx) => {
          ignoreRoles.forEach((role, index) => {
            if (
              ignoreRoles
                .filter((_, i) => i !== index)
                .find((r) => r.roleName === role.roleName)
            ) {
              ctx.addIssue({
                message: `Role "${role.roleName}" is duplicated`,
                code: z.ZodIssueCode.custom,
                path: [index, "roleName"],
              });
            }
          });
        }),
      turnTimeLimit: z
        .object({
          time: z.number().positive(),
          type: z.enum(["persistent", "reset"]),
        })
        .optional(),
    })
    .optional(),
  decks: z.array(
    z.object({
      name: z.string(),
      list: z
        .array(
          z.object({
            name: z.string().min(1),
            categoryName: z.string().optional(),
            num: z.number().int().positive(),
            description: z.string(),
          }),
        )
        .superRefine((list, ctx) => {
          list.forEach(({ name }, index) => {
            if (
              list.filter((_, i) => i !== index).find((l) => l.name === name)
            ) {
              ctx.addIssue({
                message: `Card "${name}" is duplicated`,
                code: z.ZodIssueCode.custom,
                path: [index, "name"],
              });
            }
          });
        }),
      playableRoles: z.array(z.object({ roleName: z.string() })),
    }),
  ),
  defaultHand: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("random"),
        roleFor: z.string(),
        number: z.number().int().positive(),
        deckFrom: z.string(),
      }),
      z.object({
        type: z.literal("fixed"),
        roleFor: z.string(),
        deckFrom: z.string(),
        cards: z.array(z.object({ name: z.string(), num: z.number() })),
      }),
    ]),
  ),
  fieldArea: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      roleFor: z.union([
        z.literal("main"),
        z.intersection(z.string(), z.object({})),
      ]),
      fieldSize: z.object({
        width: z.number().positive(),
        height: z.number().positive(),
      }),
      // field: z.array(
      //   z.object({
      //     name: z.string(),
      //     description: z.string(),
      //     color: z.string(),
      //     position: z.object({
      //       l: z.number().int().nonnegative(),
      //       t: z.number().int().nonnegative(),
      //       r: z.number().int().nonnegative(),
      //       b: z.number().int().nonnegative(),
      //     }),
      //     operableRoles: z.array(z.object({ name: z.string() })),
      //     visibleRoles: z.array(z.object({ name: z.string() })),
      //   }),
      // ),
    }),
  ),
  //   dice: z
  //     .array(
  //       z.object({
  //         name: z.string(),
  //         range: z.object({
  //           min: z.number().int(),
  //           max: z.number().int(),
  //           step: z.number().int().positive(),
  //         }),
  //       }),
  //     )
  //     .refine((dice) => dice.every((d) => d.range.min < d.range.max), {
  //       message: "Dice min must be less than max",
  //     }),
  //   rankingBy: z.enum(["hands", "points", "manual", "none"]),
  // })
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
