import type { RULE_MAKE_FORM_BRAND_NAMES } from "app/constants/ruleMakeForm";
import type {
  cardName,
  deck,
  deckList,
  deckListCategoryName,
  deckName,
  decksSchema,
} from "app/zodSchemas/ruleMakeForm/decks";
import type { defaultHandsSchema } from "app/zodSchemas/ruleMakeForm/defaultHands";
import type {
  dice,
  diceName,
  dicesRange,
  dicesSchema,
} from "app/zodSchemas/ruleMakeForm/dices";
import type { fieldAreasSchema } from "app/zodSchemas/ruleMakeForm/fieldAreas";
import type { playerSchema } from "app/zodSchemas/ruleMakeForm/player";
import type {
  role,
  roleName,
  rolesSchema,
} from "app/zodSchemas/ruleMakeForm/roles";
import type { turnSchema } from "app/zodSchemas/ruleMakeForm/turn";
import type { z } from "zod";

export type Decks = z.infer<typeof decksSchema>;
export type DeckName = z.infer<typeof deckName>;
export type CardName = z.infer<typeof cardName>;
export type DeckListCategoryName = z.infer<typeof deckListCategoryName>;
export type DeckList = z.infer<typeof deckList>;
export type Deck = z.infer<typeof deck>;
export type DefaultHands = z.infer<typeof defaultHandsSchema>;
export type Dices = z.infer<typeof dicesSchema>;
export type Dice = z.infer<typeof dice>;
export type DiceName = z.infer<typeof diceName>;
export type DicesRange = z.infer<typeof dicesRange>;
export type FieldAreas = z.infer<typeof fieldAreasSchema>;
export type Player = z.infer<typeof playerSchema>;
export type RoleName = z.infer<typeof roleName>;
export type Roles = z.infer<typeof rolesSchema>;
export type Role = z.infer<typeof role>;
export type Turn = z.infer<typeof turnSchema>;

export type RULE_MAKE_FORM_BRAND_NAMES_TYPE =
  (typeof RULE_MAKE_FORM_BRAND_NAMES)[number];
