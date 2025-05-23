import type { EnsureUniqueStrArr } from "app/types";

export const uniqueStrArr = <T extends readonly [string, ...string[]]>(
  arr: EnsureUniqueStrArr<[...T]>,
): T => arr;
