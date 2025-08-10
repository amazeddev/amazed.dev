import React from "react";
import { EnhancedIconProps } from "../types";

const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  icon,
  size = "2rem",
  color = "inherit",
  hoverColor = "var(--purple)",
  className = "",
  onClick,
}) => {
  // Clone the passed element and add our props
  const enhancedIcon = React.cloneElement(icon, {
    style: {
      ...icon.props.style,
      fontSize: size,
      color: color,
      transition: "color 0.3s ease",
      cursor: onClick ? "pointer" : "default",
    },
    className: `${icon.props.className || ""} enhanced-icon`,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      (e.target as HTMLElement).style.color = hoverColor;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      (e.target as HTMLElement).style.color = color;
    },
    onClick: onClick,
  });

  return (
    <div className={`enhanced-icon-wrapper ${className}`}>{enhancedIcon}</div>
  );
};

export default EnhancedIcon;

// Usage examples:
// <EnhancedIcon
//   icon={<i className="devicon-react-original"></i>}
//   size="3rem"
//   color="blue"
//   hoverColor="red"
//   onClick={() => console.log('React clicked!')}
// />
//
// <EnhancedIcon
//   icon={<img src="/logo.png" alt="Logo" />}
//   size="4rem"
// />
