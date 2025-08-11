import React from "react";
import { FlexibleContainerProps } from "../types";

const FlexibleContainer: React.FC<FlexibleContainerProps> = ({
  icon,
  title,
  description,
  layout = "horizontal",
  className = "",
}) => {
  return (
    <div
      className={`flexible-container ${layout} ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexDirection: layout === "vertical" ? "column" : "row",
      }}
    >
      {/* Icon can be any React element */}
      <div className="icon-section">{icon}</div>

      <div className="content-section">
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default FlexibleContainer;
