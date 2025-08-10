import Head from "next/head";
import React from "react";
import { structText } from "../utils/text";
import DesktopTechStack from "../components/DesktopTechStack";
import MobileTechStack from "../components/MobileTechStack";
import { Translation } from "../types";

interface AboutProps {
  translations: Translation;
}

export default function About({ translations }: AboutProps) {
  return (
    <>
      <Head>
        <title>Amazed.DEV - {translations.about.banner.title}</title>
      </Head>
      <div className="container-content">
        <div className="about">
          <div className="about-banner">
            <h1 className="post-title">{translations.about.banner.title}</h1>
            <>{structText(translations.about.banner.paragraph)}</>
          </div>

          <div className="about-stack" id="stack">
            <h2 className="stack-title">{translations.about.stack.title}</h2>
            <DesktopTechStack translations={translations} />
            <MobileTechStack translations={translations} />
          </div>

          {/* <div className="about-contact" id="contact">
            <h2 className="stack-title">Contact me</h2>
            <p>
              If you have any questions or want to discuss a project, feel free
              to contact me.
            </p>
            <a href="mailto:luszczeksebastian@gmail.com">
              luszczeksebastian@gmail.com
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}
