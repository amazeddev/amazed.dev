import React from "react";

const EnhancedIcon = ({
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
    onMouseEnter: (e) => {
      e.target.style.color = hoverColor;
    },
    onMouseLeave: (e) => {
      e.target.style.color = color;
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
