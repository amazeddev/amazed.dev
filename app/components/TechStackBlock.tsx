import React from "react";
import { structText } from "../utils/text";
import { Translation } from "../types";

interface TechStackBlockProps {
  children: React.ReactNode;
  activeTab: string;
  tabName: string;
  translations: Translation;
}

const TechStackBlock: React.FC<TechStackBlockProps> = ({
  children,
  activeTab,
  tabName,
  translations,
}) => {
  return (
    <div className={`tabcontent ${activeTab === tabName ? "active" : ""}`}>
      <div className="tech-stack-block-content">
        {structText(
          (
            translations.about.stack[
              tabName as keyof typeof translations.about.stack
            ] as any
          )?.paragraph || ""
        )}
      </div>
      <div className="stack-header">
        <h3>{(translations.about.stack as any).tech || "Tech"}:</h3>
        <span className="tech-icons">{children}</span>
      </div>
    </div>
  );
};

export default TechStackBlock;
