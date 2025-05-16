import { expect } from "vitest";
import type { SafeParseReturnType } from "zod";

export const expectWithValidateError = <T, U>(
  validate: SafeParseReturnType<T, U>,
) =>
  expect(
    validate.success,
    `Validation failed: ${JSON.stringify(validate.error, null, 2)}`,
  );

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("expectWithValidateError pass", () => {
    expect(true).toBe(true);
  });
}
