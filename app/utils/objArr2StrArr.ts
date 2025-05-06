export const objArr2StrArr = <T extends Record<string, any>, U extends keyof T>(
  objArray: T[] | undefined,
  key: U,
) => objArray?.map((obj) => obj[key]);
