export const conditionalSequence = (
  _comment: string,
  ...fns: [...(() => boolean)[], () => void]
) => fns.reduce((acc, fn) => acc && (fn as () => boolean)(), true);
