export const wrap = (comment: string, fn: () => void, opt?: true) => {
  if (opt) {
    console.log(`do${comment}`);
  }
  fn();
  if (opt) {
    console.log(`done${comment}`);
  }
};
