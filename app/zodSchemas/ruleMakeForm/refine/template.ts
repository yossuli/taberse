import type { CardName, DeckName, RoleName } from "app/types/ruleMakeForm";

export const template = {
  roles: (
    roleNames: RoleName[],
    validateTarget: string,
    outliers: RoleName[],
  ) =>
    `${validateTarget} (${outliers.join(", ")}) are not in roles (${roleNames.join(", ")})`,
  decks: (
    deckNames: DeckName[],
    validateTarget: string,
    outliers: DeckName[],
  ) =>
    `${validateTarget} (${outliers.join(", ")}) are not in decks (${deckNames.join(", ")})`,
  deckList: (
    validateTarget: string,
    outliers: CardName[],
    deckName: DeckName,
    cardNames: CardName[],
  ) =>
    `${validateTarget} (${outliers.join(", ")}) are not in decks: ${deckName} (${cardNames.join(", ")})`,
};
