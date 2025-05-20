import { card, deck } from "@defaultValues/decks";
import {
  defaultHandFixed,
  defaultHandRandom,
} from "@defaultValues/defaultHands";
import { field, fieldArea } from "@defaultValues/fieldAreas";
import { role } from "@defaultValues/roles";
import { defaultValues } from "app/constants/ruleMakeForm/defaultValues";
import { expectWithValidateError } from "app/utils/expectWithValidateError";
import { RuleSchema } from "../";

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;
  const testRoles = [
    { ...role, name: "default" },
    { ...role, name: "test" },
    { ...role, name: "test2" },
    { ...role, name: "test3" },
  ];
  it("ignoreRolesはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: testRoles,
      turn: {
        ignoreRoles: [
          { roleName: "default" },
          { roleName: "test" },
          { roleName: "test2" },
          { roleName: "test3" },
        ],
      },
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("rolesに含まれないignoreRolesはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: testRoles,
      turn: {
        ignoreRoles: [
          { roleName: "default" },
          { roleName: "test" },
          { roleName: "test2" },
          { roleName: "test3" },
          { roleName: "test4" },
        ],
      },
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "turn.ignoreRoles (test4) are not in roles (default, test, test2, test3)",
    );
  });

  it("deck.playableRolesはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: testRoles,
      decks: [
        {
          ...deck,
          playableRoles: [{ roleName: "default" }, { roleName: "test3" }],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("rolesに含まれないdeck.playableRolesはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: testRoles,
      decks: [
        deck,
        {
          ...deck,
          playableRoles: [
            { roleName: "default" },
            { roleName: "test" },
            { roleName: "test4" },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "decks[1].deck.playableRoles (test4) are not in roles (default, test, test2, test3)",
    );
  });

  it("defaultHands.roleForはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: testRoles,
      defaultHands: [
        {
          ...defaultHandRandom,
          roleFor: "default",
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("rolesに含まれないdefaultHands.roleForはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: testRoles,
      defaultHands: [
        {
          ...defaultHandRandom,
          roleFor: "default",
        },
        {
          ...defaultHandRandom,
          roleFor: "test4",
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "defaultHands.roleFor (test4) are not in roles (default, test, test2, test3)",
    );
  });

  it("field.operableRolesはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: testRoles,
      fieldAreas: [
        {
          ...fieldArea,
          field: [
            {
              ...field,
              operableRoles: [{ roleName: "default" }, { roleName: "test3" }],
            },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("rolesに含まれないfield.operableRolesはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: testRoles,
      fieldAreas: [
        fieldArea,
        {
          ...fieldArea,
          name: "test1",
          field: [
            field,
            {
              ...field,
              name: "test",
              operableRoles: [{ roleName: "test" }, { roleName: "test4" }],
            },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "fieldAreas[1].field[1].operableRoles (test4) are not in roles (default, test, test2, test3)",
    );
  });

  it("field.visibleRolesはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: testRoles,
      fieldAreas: [
        {
          ...fieldArea,
          field: [
            {
              ...field,
              visibleRoles: [{ roleName: "default" }, { roleName: "test2" }],
            },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("rolesに含まれないfield.visibleRolesはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: testRoles,
      fieldAreas: [
        fieldArea,
        {
          ...fieldArea,
          name: "test",
          field: [
            field,
            {
              ...field,
              name: "test",
              visibleRoles: [{ roleName: "test3" }, { roleName: "test4" }],
            },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "fieldAreas[1].field[1].visibleRoles (test4) are not in roles (default, test, test2, test3)",
    );
  });

  describe("defaultHands.deckFrom", () => {
    it("deckFromはdeck.nameに含まれる必要がある", () => {
      const okValues = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandRandom,
            deckFrom: "deck1",
          },
          {
            ...defaultHandFixed,
            deckFrom: "deck2",
          },
        ],
      };
      const validate = RuleSchema.safeParse(okValues);
      expectWithValidateError(validate).toBe(true);
    });
    it("deck.nameに含まれないdeckFromはエラー(type random)", () => {
      const failedValue = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandRandom,
            deckFrom: "deck1",
          },
          {
            ...defaultHandRandom,
            deckFrom: "deck3",
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands.deckFrom (deck3) are not in decks (deck1, deck2)",
      );
    });
    it("deck.nameに含まれないdeckFromはエラー(type fixed)", () => {
      const failedValue = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandRandom,
            deckFrom: "deck1",
          },
          {
            ...defaultHandFixed,
            deckFrom: "deck3",
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands.deckFrom (deck3) are not in decks (deck1, deck2)",
      );
    });
  });
  describe("defaultHands.roleFor", () => {
    it("roleForはrole.nameに含まれる必要がある", () => {
      const okValues = {
        ...defaultValues,
        roles: testRoles,
        defaultHands: [
          {
            ...defaultHandRandom,
            roleFor: "default",
          },
          {
            ...defaultHandFixed,
            roleFor: "test2",
          },
        ],
      };
      const validate = RuleSchema.safeParse(okValues);
      expectWithValidateError(validate).toBe(true);
    });
    it("role.nameに含まれないroleForはエラー(type random)", () => {
      const failedValue = {
        ...defaultValues,
        roles: testRoles,
        defaultHands: [
          {
            ...defaultHandRandom,
            roleFor: "default",
          },
          {
            ...defaultHandFixed,
            roleFor: "test4",
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands.roleFor (test4) are not in roles (default, test, test2, test3)",
      );
    });
    it("deck.nameに含まれないroleForはエラー(type random)", () => {
      const failedValue = {
        ...defaultValues,
        roles: testRoles,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandRandom,
            roleFor: "default",
          },
          {
            ...defaultHandRandom,
            roleFor: "test4",
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands.roleFor (test4) are not in roles (default, test, test2, test3)",
      );
    });
    it("deck.nameに含まれないdeckFromはエラー(type fixed)", () => {
      const failedValue = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandRandom,
            deckFrom: "deck1",
          },
          {
            ...defaultHandFixed,
            deckFrom: "deck3",
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands.deckFrom (deck3) are not in decks (deck1, deck2)",
      );
    });
  });

  describe("defaultHands[type=fixed].cards", () => {
    it("cardsはすべてdecks[name=deckFrom].listに含まれる", () => {
      const okValues = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandFixed,
            deckFrom: "deck1",
            cards: [{ name: "default", num: 1 }],
          },
        ],
      };
      const validate = RuleSchema.safeParse(okValues);
      expectWithValidateError(validate).toBe(true);
    });
    it("decks[name=deckFrom].listに含まれないcardsはエラー", () => {
      const failedValue = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          { ...deck, name: "deck2" },
        ],
        defaultHands: [
          {
            ...defaultHandFixed,
            deckFrom: "deck1",
            cards: [{ name: "default", num: 1 }],
          },
          {
            ...defaultHandFixed,
            deckFrom: "deck2",
            cards: [{ name: "test", num: 1 }],
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands[1].cards (test) are not in decks: deck2 (default)",
      );
    });
    it("decks[name=deckFrom].listではないdeck.listに含まれるcardsもエラー", () => {
      const failedValue = {
        ...defaultValues,
        decks: [
          { ...deck, name: "deck1" },
          {
            ...deck,
            name: "deck2",
            list: [
              {
                ...card,
                name: "test",
              },
            ],
          },
        ],
        defaultHands: [
          {
            ...defaultHandFixed,
            deckFrom: "deck1",
            cards: [{ name: "test", num: 1 }],
          },
        ],
      };
      const validate = RuleSchema.safeParse(failedValue);
      expect(validate.success).toBe(false);
      expect(validate.error?.issues[0].message).toBe(
        "defaultHands[0].cards (test) are not in decks: deck1 (default)",
      );
    });
  });
  it("roleFor.num * cards.numはdeck.listのcards.numを超えてはいけない", () => {
    const okValues = {
      ...defaultValues,
      roles: [{ ...role, num: 2 }],
      decks: [
        {
          ...deck,
          name: "deck1",
          list: [
            { ...card, name: "default", num: 4 },
            { ...card, name: "test", num: 2 },
          ],
        },
      ],
      defaultHands: [
        {
          ...defaultHandFixed,
          deckFrom: "deck1",
          cards: [{ name: "default", num: 2 }],
        },
        {
          ...defaultHandFixed,
          deckFrom: "deck1",
          cards: [{ name: "test", num: 1 }],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("roleFor.num * cards.numがdeck.listのcards.numを超えるとエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: [{ ...role, num: 2 }],
      decks: [
        {
          ...deck,
          name: "deck1",
          list: [
            { ...card, name: "test", num: 4 },
            { ...card, name: "test2", num: 2 },
          ],
        },
      ],
      defaultHands: [
        {
          ...defaultHandFixed,
          deckFrom: "deck1",
          cards: [{ name: "test", num: 3 }],
        },
        {
          ...defaultHandFixed,
          deckFrom: "deck1",
          cards: [{ name: "test2", num: 1 }],
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "defaultHands[0].cards[0].name (test) is deck1: test (4) < card: test (3) * default (2)",
    );
  });
}
