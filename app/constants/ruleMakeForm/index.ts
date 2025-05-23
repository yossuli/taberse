import { uniqueStrArr } from "app/utils/uniqueStrArr";

export const RULE_MAKE_FORM_BRAND_NAMES = uniqueStrArr([
  "DeckName",
  "DeckListCategoryName",
  "CardName",
  "DiceName",
  "FieldName",
  "FieldAreaName",
  "RoleName",
] as const);
