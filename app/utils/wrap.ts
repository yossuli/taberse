export const wrap =
  <T extends (...args: any[]) => any>(comment: string, fn: T) =>
  (opt?: true): ReturnType<T> => {
    if (opt) {
      console.log(`do${comment}`);
    }
    const result = fn();
    if (opt) {
      console.log(`done${comment}`);
    }
    return result;
  };

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("wrap test", () => {
    let result = "";
    wrap("test", () => {
      result = "test";
    })();
    expect(result).toBe("test");
  });

  it("wrap test with opt", () => {
    let result = "";
    wrap("test", () => {
      result = "test";
    })(true);
    expect(result).toBe("test");
  });
}
