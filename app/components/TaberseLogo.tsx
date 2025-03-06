import type { FC } from "react";

interface TaberseLogoProps {
  width?: number;
  height?: number;
  onClick?: () => void;
}

export const TaberseLogo: FC<TaberseLogoProps> = ({
  width = 45,
  height = 45,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      width={width}
      height={height}
      fill="none"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <title>Taberse</title>
      <rect x="0" y="0" width="45" height="45" rx="8" ry="8" fill="#f8faff" />

      {/* 背景楕円 */}
      <ellipse
        cx="22.5"
        cy="30"
        rx="28"
        ry="8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.6"
        transform="rotate(-10, 22.5, 30)"
      />
      <ellipse
        cx="22.5"
        cy="30"
        rx="24"
        ry="6.8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.6"
        transform="rotate(-10, 22.5, 30)"
      />
      <ellipse
        cx="22.5"
        cy="30"
        rx="20"
        ry="5.6"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.6"
        transform="rotate(-10, 22.5, 30)"
      />
      <ellipse
        cx="22.5"
        cy="30"
        rx="16"
        ry="4.4"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.6"
        transform="rotate(-10, 22.5, 30)"
      />

      {/* 交差線 */}
      <line
        x1="-5"
        y1="30"
        x2="50"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(-10, 22.5, 30)"
      />
      <line
        x1="-2"
        y1="30"
        x2="47"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(10, 22.5, 30)"
      />
      <line
        x1="1"
        y1="30"
        x2="44"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(30, 22.5, 30)"
      />
      <line
        x1="4"
        y1="30"
        x2="41"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(50, 22.5, 30)"
      />
      <line
        x1="7"
        y1="30"
        x2="38"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(70, 22.5, 30)"
      />
      <line
        x1="10"
        y1="30"
        x2="35"
        y2="30"
        stroke="#3b82f6"
        strokeWidth="0.4"
        strokeOpacity="0.5"
        transform="rotate(90, 22.5, 30)"
      />

      {/* カード1 */}
      <rect
        x="5"
        y="12"
        width="8"
        height="11.2"
        rx="2"
        ry="2"
        fill="white"
        stroke="#1e293b"
        strokeWidth="0.7"
        transform="rotate(-15, 9, 17.6)"
        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
      />
      <path
        d="M22,17 C24,14 28,14 30,17 C32,20 29,25 22,30 C15,25 12,20 14,17 C16,14 20,14 22,17"
        fill="#1e293b"
        transform="scale(0.3) translate(7, 38) rotate(-15, 9, 20.6)"
      />

      {/* カード2 */}
      <rect
        x="15"
        y="10"
        width="8"
        height="11.2"
        rx="2"
        ry="2"
        fill="white"
        stroke="#1e293b"
        strokeWidth="0.7"
        transform="rotate(-5, 19, 15.6)"
        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
      />

      <text
        x="17"
        y="17"
        fontFamily="Arial, sans-serif"
        fontSize="6"
        fontWeight="bold"
        fill="#dc2626"
        transform="rotate(-5, 19, 15.6)"
      >
        Y
      </text>

      {/* カード3 */}
      <rect
        x="25"
        y="8"
        width="8"
        height="11.2"
        rx="2"
        ry="2"
        fill="#f5f5dc"
        stroke="#1e293b"
        strokeWidth="0.7"
        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
      />
      <rect
        x="26.6"
        y="10"
        width="4.8"
        height="8"
        rx="1"
        ry="1"
        fill="none"
        stroke="#166534"
        strokeWidth="0.7"
      />
      <text
        x="26.5"
        y="16"
        fontFamily="Arial, sans-serif"
        fontSize="4.8"
        fontWeight="bold"
        fill="#166534"
      >
        中
      </text>

      {/* カード4 */}
      <rect
        x="35"
        y="10"
        width="8"
        height="11.2"
        rx="2"
        ry="2"
        fill="#a263eb"
        stroke="#1e293b"
        strokeWidth="0.7"
        transform="rotate(5, 39, 15.6)"
        filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
      />
      <ellipse
        cx="39"
        cy="15.6"
        rx="3.2"
        ry="4.4"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        transform="rotate(5, 39, 15.6)"
      />
      <text
        x="37.8"
        y="17.2"
        fontFamily="Arial, sans-serif"
        fontSize="4"
        fontWeight="bold"
        fill="white"
        transform="rotate(5, 39, 15.6)"
      >
        4
      </text>

      {/* 装飾円 */}
      <circle cx="3" cy="10" r="1.8" fill="#f43f5e" />
      <circle cx="13" cy="5" r="1.8" fill="#38bdf8" />
      <circle cx="25" cy="2" r="1.8" fill="#3b82f6" />
      <circle cx="37" cy="5" r="1.8" fill="#f59e0b" />
      <circle cx="47" cy="10" r="1.8" fill="#22c55e" />

      {/* ロゴテキスト */}
      <text
        x="22.5"
        y="35"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="bold"
        fill="#1e293b"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        Taberse
      </text>
    </svg>
  );
};
