import React, { useState } from "react";
import TechStackBlock from "./TechStackBlock";
import { Translation } from "../types";

interface MobileTechStackProps {
  translations: Translation;
}

const MobileTechStack: React.FC<MobileTechStackProps> = ({ translations }) => {
  const [activeTab, setActiveTab] = useState("languages");

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tech-stack-blocks-mobile">
      <div className="about-tabs">
        <div className="tab">
          <div
            className={`tabBtn ${activeTab === "languages" ? "active" : ""}`}
            onClick={() => openTab("languages")}
          >
            {translations.about.stack.languages.title}
            {activeTab !== "languages" && <span className="tab-icon">+</span>}
          </div>

          <TechStackBlock
            activeTab={activeTab}
            tabName="languages"
            translations={translations}
          >
            <i className="devicon-go-plain" title="Golang"></i>
            <i className="devicon-python-plain" title="Python"></i>
            <i className="devicon-javascript-plain" title="Javacript"></i>
            <i className="devicon-typescript-plain" title="TypeScript"></i>
          </TechStackBlock>
          <div
            className={`tabBtn ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => openTab("tools")}
          >
            {translations.about.stack.tools.title}
            {activeTab !== "tools" && <span className="tab-icon">+</span>}
          </div>
          <TechStackBlock
            activeTab={activeTab}
            tabName="tools"
            translations={translations}
          >
            <i className="devicon-redis-plain" title="Redis"></i>
            <img src="/images/lambda.png" title="AWS Lambda" />
            <i className="devicon-mongodb-plain" title="MongoDB"></i>
            <img src="/images/rabbitmq.png" title="RabbitMQ" />
            <i className="devicon-nestjs-plain" title="Nest"></i>
          </TechStackBlock>
          <div
            className={`tabBtn ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => openTab("ai")}
          >
            {translations.about.stack.ai.title}
            {activeTab !== "ai" && <span className="tab-icon">+</span>}
          </div>

          <TechStackBlock
            activeTab={activeTab}
            tabName="ai"
            translations={translations}
          >
            <img src="/images/cursor.png" title="Cursor" />
            <img src="/images/mcp.png" title="MCP" />
            <img src="/images/langfuse.png" title="Langfuse" />
            <img src="/images/langchain.png" title="Langchain" />
            <img src="/images/anthropic.png" title="Anthropic" />
            <img src="/images/ollama.png" title="Ollama" />
            <img src="/images/openai.png" title="OpenAI" />
          </TechStackBlock>
          <div
            className={`tabBtn ${
              activeTab === "infrastructure" ? "active" : ""
            }`}
            onClick={() => openTab("infrastructure")}
          >
            {translations.about.stack.infrastructure.title}
            {activeTab !== "infrastructure" && (
              <span className="tab-icon">+</span>
            )}
          </div>
          <TechStackBlock
            activeTab={activeTab}
            tabName="infrastructure"
            translations={translations}
          >
            <i className="devicon-kubernetes-plain" title="Kubernetes"></i>
            <i className="devicon-terraform-plain" title="Terraform"></i>
            <i className="devicon-docker-plain" title="Docker"></i>
            <img src="/images/aws.png" title="AWS" />
          </TechStackBlock>
        </div>
      </div>
    </div>
  );
};

export default MobileTechStack;
