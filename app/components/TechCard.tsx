import React from "react";
import { TechCardProps } from "../types";

const TechCard: React.FC<TechCardProps> = ({
  icon,
  badge,
  title,
  subtitle,
  children,
  variant = "default",
  onClick,
}) => {
  return (
    <div
      className={`tech-card tech-card--${variant}`}
      onClick={onClick}
      style={{
        position: "relative",
        padding: "1.5rem",
        border: "2px solid var(--purple)",
        borderRadius: "12px",
        backgroundColor: "var(--dark)",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
      }}
    >
      {/* Badge in top corner */}
      {badge && (
        <div
          className="tech-card__badge"
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            fontSize: "0.8rem",
          }}
        >
          {badge}
        </div>
      )}

      {/* Main icon */}
      <div
        className="tech-card__icon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
          fontSize: "3rem",
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="tech-card__content">
        {title && <h3 style={{ margin: "0 0 0.5rem 0" }}>{title}</h3>}
        {subtitle && (
          <p style={{ margin: "0 0 1rem 0", opacity: 0.8 }}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default TechCard;
