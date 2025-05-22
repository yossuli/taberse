export const conditionalSequence = (
  ...fns: [...(() => boolean)[], () => void]
) => fns.reduce((acc, fn) => acc && (fn as () => boolean)(), true);

if (import.meta.vitest) {
  const {
    it,
    expect,
    vi: { fn },
  } = import.meta.vitest;
  it("conditionalSequence", () => {
    const fn1 = fn(() => {
      expect(fn2).not.toHaveBeenCalled();
      expect(fn3).not.toHaveBeenCalled();
      expect(fn4).not.toHaveBeenCalled();
      return true;
    });
    const fn2 = fn(() => {
      expect(fn1).toHaveBeenCalled();
      expect(fn3).not.toHaveBeenCalled();
      expect(fn4).not.toHaveBeenCalled();
      return true;
    });
    const fn3 = fn(() => {
      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
      expect(fn4).not.toHaveBeenCalled();
      return false;
    });
    const fn4 = fn(() => false);

    expect(conditionalSequence(fn1, fn2, fn3, fn4)).toBe(false);
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
    expect(fn4).not.toHaveBeenCalled();
  });
}
