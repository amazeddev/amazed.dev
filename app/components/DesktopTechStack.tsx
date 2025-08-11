import React, { useState } from "react";
import TechStackBlock from "./TechStackBlock";
import { Translation } from "../types";
import Image from "next/image";

interface DesktopTechStackProps {
  translations: Translation;
}

const DesktopTechStack: React.FC<DesktopTechStackProps> = ({
  translations,
}) => {
  const [activeTab, setActiveTab] = useState("languages");

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tech-stack-blocks-desktop">
      <div className="about-tabs">
        <div className="tab">
          <div
            className={`tabBtn ${activeTab === "languages" ? "active" : ""}`}
            onClick={() => openTab("languages")}
          >
            {translations.about.stack.languages.title}
          </div>
          <div
            className={`tabBtn ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => openTab("tools")}
          >
            {translations.about.stack.tools.title}
          </div>
          <div
            className={`tabBtn ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => openTab("ai")}
          >
            {translations.about.stack.ai.title}
          </div>
          <div
            className={`tabBtn ${
              activeTab === "infrastructure" ? "active" : ""
            }`}
            onClick={() => openTab("infrastructure")}
          >
            {translations.about.stack.infrastructure.title}
          </div>
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

        <TechStackBlock
          activeTab={activeTab}
          tabName="tools"
          translations={translations}
        >
          <i className="devicon-redis-plain" title="Redis"></i>
          <Image src="/images/lambda.png" title="AWS Lambda" alt="AWS Lambda" />
          <i className="devicon-mongodb-plain" title="MongoDB"></i>
          <Image src="/images/rabbitmq.png" title="RabbitMQ" alt="RabbitMQ" />
          <i className="devicon-express-original" title="Express"></i>
          <i className="devicon-nestjs-plain" title="Nest"></i>
          <i className="devicon-nodejs-plain" title="Node.js"></i>
        </TechStackBlock>

        <TechStackBlock
          activeTab={activeTab}
          tabName="ai"
          translations={translations}
        >
          <Image src="/images/cursor.png" title="Cursor" alt="Cursor" />
          <Image src="/images/mcp.png" title="MCP" alt="MCP" />
          <Image src="/images/langfuse.png" title="Langfuse" alt="Langfuse" />
          <Image
            src="/images/langchain.png"
            title="Langchain"
            alt="Langchain"
          />
          <Image
            src="/images/anthropic.png"
            title="Anthropic"
            alt="Anthropic"
          />
          <Image src="/images/ollama.png" title="Ollama" alt="Ollama" />
          <Image src="/images/openai.png" title="OpenAI" alt="OpenAI" />
        </TechStackBlock>

        <TechStackBlock
          activeTab={activeTab}
          tabName="infrastructure"
          translations={translations}
        >
          <i className="devicon-kubernetes-plain" title="Kubernetes"></i>
          <i className="devicon-terraform-plain" title="Terraform"></i>
          <i className="devicon-docker-plain" title="Docker"></i>
          <Image src="/images/aws.png" title="AWS" alt="AWS" />
        </TechStackBlock>
      </div>
    </div>
  );
};

export default DesktopTechStack;
