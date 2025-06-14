import type { RULE_MAKE_FORM_BRAND_NAMES_TYPE } from "app/types/ruleMakeForm";
import { z } from "zod";

export const parseName = (str: string, name: RULE_MAKE_FORM_BRAND_NAMES_TYPE) =>
  z.string().min(1).brand(name).parse(str);
