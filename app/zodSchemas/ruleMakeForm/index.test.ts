import { defaultValues } from "app/constants/ruleMakeForm/defaultValues";
import { decks } from "app/constants/ruleMakeForm/defaultValues/decks";
import { defaultHands } from "app/constants/ruleMakeForm/defaultValues/defaultHands";
import { fieldAreas } from "app/constants/ruleMakeForm/defaultValues/fieldAreas";
import { expectWithValidateError } from "app/utils/expectWithValidateError";
import { RuleSchema } from ".";

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("ignoreRolesはrolesに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      turn: {
        ignoreRoles: [
          { roleName: "default" },
          { roleName: "test" },
          { roleName: "test2" },
          { roleName: "test3" },
          { roleName: "test4" }, // this is not in roles
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      decks: [
        {
          ...decks[0],
          playableRoles: [
            { roleName: "default" },
            { roleName: "test" },
            { roleName: "test2" },
            { roleName: "test3" },
          ],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });

  it("rolesに含まれないdeck.playableRolesはエラー", () => {
    const failedValue = {
      ...defaultValues,
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      decks: [
        decks[0],
        {
          ...decks[0],
          playableRoles: [
            { roleName: "default" },
            { roleName: "test" },
            { roleName: "test2" },
            { roleName: "test3" },
            { roleName: "test4" }, // this is not in roles
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      defaultHands: [
        {
          ...defaultHands[0],
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      defaultHands: [
        {
          ...defaultHands[0],
          roleFor: "default",
        },
        {
          ...defaultHands[0],
          roleFor: "test4", // this is not in roles
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      fieldAreas: [
        {
          ...fieldAreas[0],
          field: [
            {
              ...fieldAreas[0].field[0],
              operableRoles: [
                { roleName: "default" },
                { roleName: "test" },
                { roleName: "test2" },
                { roleName: "test3" },
              ],
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      fieldAreas: [
        fieldAreas[0],
        {
          ...fieldAreas[0],
          name: "test1",
          field: [
            fieldAreas[0].field[0],
            {
              ...fieldAreas[0].field[0],
              name: "test",
              operableRoles: [
                { roleName: "default" },
                { roleName: "test" },
                { roleName: "test2" },
                { roleName: "test3" },
                { roleName: "test4" }, // this is not in roles
              ],
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      fieldAreas: [
        {
          ...fieldAreas[0],
          field: [
            {
              ...fieldAreas[0].field[0],
              visibleRoles: [
                { roleName: "default" },
                { roleName: "test" },
                { roleName: "test2" },
                { roleName: "test3" },
              ],
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
      roles: [
        { name: "default" },
        { name: "test" },
        { name: "test2" },
        { name: "test3" },
      ],
      fieldAreas: [
        fieldAreas[0],
        {
          ...fieldAreas[0],
          name: "test",
          field: [
            fieldAreas[0].field[0],
            {
              ...fieldAreas[0].field[0],
              name: "test",
              visibleRoles: [
                { roleName: "default" },
                { roleName: "test" },
                { roleName: "test2" },
                { roleName: "test3" },
                { roleName: "test4" }, // this is not in roles
              ],
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
  it("defaultHands.deckFromはdeck.nameに含まれる必要がある", () => {
    const okValues = {
      ...defaultValues,
      decks: [
        { ...decks[0], name: "deck1" },
        { ...decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          ...defaultHands[0],
          type: "random",
          deckFrom: "deck1",
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("deck.nameに含まれないdefaultHands.deckFromはエラー", () => {
    const failedValue = {
      ...defaultValues,
      decks: [
        { ...decks[0], name: "deck1" },
        { ...decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          ...defaultHands[0],
          type: "random",
          deckFrom: "deck1",
        },
        {
          ...defaultHands[0],
          type: "random",
          deckFrom: "deck3", // this is not in decks
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "defaultHands.deckFrom (deck3) are not in decks (deck1, deck2)",
    );
  });

  it("defaultHands[number].type === fixed の .cards は decks.name === defaultHands[number].deckFrom の .list にすべて含まれる", () => {
    const okValues = {
      ...defaultValues,
      decks: [
        { ...decks[0], name: "deck1" },
        { ...decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          type: "fixed",
          roleFor: "default",
          deckFrom: "deck1",
          cards: [{ name: "default", num: 1 }],
        },
      ],
    };
    const validate = RuleSchema.safeParse(okValues);
    expectWithValidateError(validate).toBe(true);
  });
  it("decks.name === defaultHands[number].deckFrom の .list に含まれない defaultHands[number].type === fixed の .cards はエラー", () => {
    const failedValue = {
      ...defaultValues,
      decks: [
        { ...decks[0], name: "deck1" },
        { ...decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          ...defaultHands[0],
          type: "fixed",
          deckFrom: "deck1",
          cards: [{ name: "default", num: 1 }],
        },
        {
          ...defaultHands[0],
          type: "fixed",
          deckFrom: "deck2",
          cards: [{ name: "test", num: 1 }], // this is not in decks
        },
      ],
    };
    const validate = RuleSchema.safeParse(failedValue);
    expect(validate.success).toBe(false);
    expect(validate.error?.issues[0].message).toBe(
      "defaultHands.cards (test) are not in decks: deck2 (default)",
    );
  });
}
