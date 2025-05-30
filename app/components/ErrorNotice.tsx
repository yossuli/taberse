import { css, cx } from "@ss/css";

export const ErrorNotice = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cx(
        css({
          gridColumn: "1/-1",
          marginY: "0!",
          bg: "red.700!",
          borderColor: "red.200!",
        }),
        "notice",
      )}
    >
      {children}
    </div>
  );
};
