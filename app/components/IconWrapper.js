import React from "react";

const IconWrapper = ({
  children,
  size = "2rem",
  color = "inherit",
  className = "",
}) => {
  return (
    <div
      className={`icon-wrapper ${className}`}
      style={{
        fontSize: size,
        color: color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default IconWrapper;

// Usage examples:
// <IconWrapper size="3rem" color="blue">
//   <i className="devicon-react-original"></i>
// </IconWrapper>
//
// <IconWrapper size="4rem">
//   <img src="/logo.png" alt="Logo" />
// </IconWrapper>
