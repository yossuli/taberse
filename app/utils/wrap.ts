export const wrap = (comment: string, fn: () => void, opt?: true) => {
  if (opt) {
    console.log(`do${comment}`);
  }
  fn();
  if (opt) {
    console.log(`done${comment}`);
  }
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("wrap test", () => {
    let result = "";
    wrap("test", () => {
      result = "test";
    });
    expect(result).toBe("test");
  });

  it("wrap test with opt", () => {
    let result = "";
    wrap(
      "test",
      () => {
        result = "test";
      },
      true,
    );
    expect(result).toBe("test");
  });
}
