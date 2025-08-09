import React, { useState } from "react";
import TechStackBlock from "./TechStackBlock";

const MobileTechStack = ({ translations }) => {
  const [activeTab, setActiveTab] = useState("languages");

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tech-stack-blocks-mobile">
      <div className="about-tabs">
        <div class="tab">
          <div
            class={`tabBtn ${activeTab === "languages" ? "active" : ""}`}
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
            <i class="devicon-go-plain" title="Golang"></i>
            <i class="devicon-python-plain" title="Python"></i>
            <i class="devicon-javascript-plain" title="Javacript"></i>
            <i class="devicon-typescript-plain" title="TypeScript"></i>
          </TechStackBlock>
          <div
            class={`tabBtn ${activeTab === "tools" ? "active" : ""}`}
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
            <i class="devicon-redis-plain" title="Redis"></i>
            <img src="/images/lambda.png" title="AWS Lambda" />
            <i class="devicon-mongodb-plain" title="MongoDB"></i>
            <img src="/images/rabbitmq.png" title="RabbitMQ" />
            <i class="devicon-nestjs-plain" title="Nest"></i>
          </TechStackBlock>
          <div
            class={`tabBtn ${activeTab === "ai" ? "active" : ""}`}
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
            <img src="/images/langfuse.png" title="Langfuse" />
            <img src="/images/langchain.png" title="Langchain" />
            <img src="/images/anthropic.png" title="Anthropic" />
            <img src="/images/openai.png" title="OpenAI" />
          </TechStackBlock>
          <div
            class={`tabBtn ${activeTab === "infrastructure" ? "active" : ""}`}
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
            <i class="devicon-kubernetes-plain" title="Kubernetes"></i>
            <i class="devicon-terraform-plain" title="Terraform"></i>
            <i class="devicon-docker-plain" title="Docker"></i>
            <img src="/images/aws.png" title="AWS" />
          </TechStackBlock>
        </div>
      </div>
    </div>
  );
};

export default MobileTechStack;
