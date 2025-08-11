import React from "react";
import { IconWrapperProps } from "../types";

const IconWrapper: React.FC<IconWrapperProps> = ({
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
