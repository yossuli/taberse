export const isNullable = <T>(
  value: T | null | undefined,
): value is null | undefined => {
  return value === null || value === undefined;
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("isNullable test with null", () => {
    const result = isNullable(null);
    expect(result).toBe(true);
  });

  it("isNullable test with undefined", () => {
    const result = isNullable(undefined);
    expect(result).toBe(true);
  });

  it("isNullable test with number", () => {
    const result = isNullable(123);
    expect(result).toBe(false);
  });

  it("isNullable test with string", () => {
    const result = isNullable("test");
    expect(result).toBe(false);
  });

  it("isNullable test with object", () => {
    const result = isNullable({ key: "value" });
    expect(result).toBe(false);
  });
}
