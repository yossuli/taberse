import { defaultValues } from "app/constants/ruleMakeForm/defaultValues";
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
          ...defaultValues.decks[0],
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
        defaultValues.decks[0],
        {
          ...defaultValues.decks[0],
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
          ...defaultValues.defaultHands[0],
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
          ...defaultValues.defaultHands[0],
          roleFor: "default",
        },
        {
          ...defaultValues.defaultHands[0],
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
          ...defaultValues.fieldAreas[0],
          field: [
            {
              ...defaultValues.fieldAreas[0].field[0],
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
        defaultValues.fieldAreas[0],
        {
          ...defaultValues.fieldAreas[0],
          name: "test1",
          field: [
            defaultValues.fieldAreas[0].field[0],
            {
              ...defaultValues.fieldAreas[0].field[0],
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
          ...defaultValues.fieldAreas[0],
          field: [
            {
              ...defaultValues.fieldAreas[0].field[0],
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
        defaultValues.fieldAreas[0],
        {
          ...defaultValues.fieldAreas[0],
          field: [
            defaultValues.fieldAreas[0].field[0],
            {
              ...defaultValues.fieldAreas[0].field[0],
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
        { ...defaultValues.decks[0], name: "deck1" },
        { ...defaultValues.decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          ...defaultValues.defaultHands[0],
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
        { ...defaultValues.decks[0], name: "deck1" },
        { ...defaultValues.decks[0], name: "deck2" },
      ],
      defaultHands: [
        {
          ...defaultValues.defaultHands[0],
          type: "random",
          deckFrom: "deck1",
        },
        {
          ...defaultValues.defaultHands[0],
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
}
