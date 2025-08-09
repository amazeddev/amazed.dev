import React from "react";
import { structText } from "../utils/text";

const TechStackBlock = ({ children, activeTab, tabName, translations }) => {
  return (
    <div class={`tabcontent ${activeTab === tabName ? "active" : ""}`}>
      <div className="tech-stack-block-content">
        {structText(translations.about.stack[tabName].paragraph)}
      </div>
      <div className="stack-header">
        <h3>{translations.about.stack.tech}:</h3>
        <span className="tech-icons">{children}</span>
      </div>
    </div>
  );
};

export default TechStackBlock;
