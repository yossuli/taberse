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
      roles.forEach(({ name }, index) => {
        if (roles.filter((_, i) => i !== index).find((r) => r.name === name)) {
          ctx.addIssue({
            message: `Role "${name}" is duplicated`,
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
    z
      .object({
        name: z.string(),
        description: z.string(),
        roleFor: z.string(),
        fieldSize: z.object({
          width: z.number().positive(),
          height: z.number().positive(),
        }),
        field: z
          .array(
            z.object({
              name: z.string(),
              description: z.string(),
              color: z.string().regex(/^(#([0-9a-f]{3}|[0-9a-f]{6})|())$/i, {
                message: "Invalid color format",
              }),
              area: z.object({
                l: z.number().int().nonnegative(),
                t: z.number().int().nonnegative(),
                r: z.number().int().nonnegative(),
                b: z.number().int().nonnegative(),
              }),
              operableRoles: z.array(z.object({ name: z.string() })),
              visibleRoles: z.array(z.object({ name: z.string() })),
            }),
          )
          .superRefine((field, ctx) => {
            field.forEach(({ name }, index) => {
              if (
                field.filter((_, i) => i !== index).find((f) => f.name === name)
              ) {
                ctx.addIssue({
                  message: `Field "${name}" is duplicated`,
                  code: z.ZodIssueCode.custom,
                  path: [index, "name"],
                });
              }
            });
          }),
      })
      .superRefine((fieldArea, ctx) => {
        fieldArea.field.forEach(({ area, name }, index) => {
          if (area.b >= fieldArea.fieldSize.height) {
            ctx.addIssue({
              message: `Field "${name}" is out of fieldSize`,
              code: z.ZodIssueCode.custom,
              path: [index, "area"],
            });
            ctx.addIssue({
              message: `This fieldArea size should be ${fieldArea.fieldSize.width} x ${fieldArea.fieldSize.height + 1}`,
              code: z.ZodIssueCode.custom,
              path: ["fieldSize"],
            });
          }
          if (area.r >= fieldArea.fieldSize.width) {
            ctx.addIssue({
              message: `Field "${name}" is out of fieldSize`,
              code: z.ZodIssueCode.custom,
              path: [index, "area"],
            });
            ctx.addIssue({
              message: `This fieldArea size should be ${fieldArea.fieldSize.width + 1} x ${fieldArea.fieldSize.height}`,
              code: z.ZodIssueCode.custom,
              path: ["fieldSize"],
            });
          }
        });
      }),
  ),
  dice: z
    .array(
      z.object({
        name: z.string().min(1),
        range: z.object({
          min: z.number().int(),
          max: z.number().int(),
          step: z.number().int().positive(),
        }),
      }),
    )
    .refine(
      (dice) => dice.every((d) => d.range.min <= d.range.max - d.range.step),
      {
        message: "Dice min must be less than max",
      },
    )
    .superRefine((dice, ctx) => {
      dice.forEach(({ name }, index) => {
        if (dice.filter((_, i) => i !== index).find((d) => d.name === name)) {
          ctx.addIssue({
            message: `Dice "${name}" is duplicated`,
            code: z.ZodIssueCode.custom,
            path: [index, "name"],
          });
        }
      });
    }),
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
