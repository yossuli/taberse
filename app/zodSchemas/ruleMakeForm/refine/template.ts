export const template = {
  roles: (roleNames: string[], targetPropName: string, targetProp: string[]) =>
    `${targetPropName} (${targetProp.join(", ")}) are not in roles (${roleNames.join(", ")})`,
  decks: (deckNames: string[], targetPropName: string, targetProp: string[]) =>
    `${targetPropName} (${targetProp.join(", ")}) are not in decks (${deckNames.join(", ")})`,
  deckList: (
    targetPropName: string,
    targetProp: string[],
    deckName: string,
    cardName: string,
  ) =>
    `${targetPropName} (${targetProp.join(", ")}) are not in decks: ${deckName} (${cardName})`,
};
