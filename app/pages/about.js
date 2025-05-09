import Head from "next/head";
import { structText } from "../utils/text";

export default function About({ translations }) {
  return (
    <>
      <Head>
        <title>Amazed.DEV - O mnie</title>
      </Head>
      <div className="container-content">
        <div className="about">
          <div className="about-baner">
            <div>
              <h1 className="post-title">{translations.about.greeting}</h1>
              <>{structText(translations.about.banner.paragraph)}</>
            </div>
            <div className="about-image">
              <img src="/images/profile.jpeg" title="AmazedDEV" />
            </div>
          </div>

          <div className="tech-stack">
            <h2>{translations.about.stack.title}</h2>

            <div className="stack-header">
              <h3>{translations.about.stack.languages.title}</h3>
              <span className="tech-icons">
                <i class="devicon-python-plain" title="Python"></i>
                <i class="devicon-go-plain" title="Golang"></i>
                <i class="devicon-javascript-plain" title="Javacript"></i>
                <i class="devicon-typescript-plain" title="TypeScript"></i>
                {/* <i class="devicon-lua-plain"></i> */}
              </span>
            </div>
            <>{structText(translations.about.stack.languages.paragraph)}</>

            <div className="stack-header">
              <h3>{translations.about.stack.backend.title}</h3>
              <span className="tech-icons">
                <i class="devicon-redis-plain" title="Redis"></i>
                <img src="/images/lambda.png" title="AWS Lambda" />
                {/* <i class="devicon-graphql-plain"></i> */}
                <i class="devicon-mongodb-plain" title="MongoDB"></i>
                <img src="/images/rabbitmq.png" title="RabbitMQ" />
                <i class="devicon-nestjs-plain" title="Nest"></i>
                <i class="devicon-nodejs-plain" title="Node"></i>
              </span>
            </div>
            <>{structText(translations.about.stack.backend.paragraph)}</>
            <div className="stack-header">
              <h3>{translations.about.stack.infrastructure.title}</h3>
              <span className="tech-icons">
                <i class="devicon-kubernetes-plain"></i>
                <i class="devicon-terraform-plain" title="Terraform"></i>
                <i class="devicon-docker-plain" title="Docker"></i>
                <i
                  class="devicon-amazonwebservices-original"
                  title="AWC Cloud"
                ></i>
              </span>
            </div>
            <>{structText(translations.about.stack.infrastructure.paragraph)}</>
          </div>
        </div>
      </div>
    </>
  );
}
