// src/component/shared/NavigationLink.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  bg?: string;
  textColor?: string;
  onClick?: () => void;
  sxHover?: React.CSSProperties; // Add sxHover here
}

const NavigationLink: React.FC<Props> = ({
  to,
  text,
  bg = "transparent",
  textColor = "white",
  onClick,
  sxHover,
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        background: bg,
        color: textColor,
        padding: "10px 20px",
        borderRadius: "30px",
        textDecoration: "none",
        fontWeight: 600,
        display: "inline-block",
        transition: "all 0.3s ease",
        transform: hover && sxHover?.transform ? sxHover.transform : "none",
        boxShadow: hover && sxHover?.boxShadow ? sxHover.boxShadow : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
