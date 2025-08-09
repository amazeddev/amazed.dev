import Head from "next/head";
import React, { useState } from "react";
import { structText } from "../utils/text";
import DesktopTechStack from "../components/DesktopTechStack";
import MobileTechStack from "../components/MobileTechStack";

export default function About({ translations }) {
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

          <h2 className="stack-title">{translations.about.stack.title}</h2>
          <DesktopTechStack translations={translations} />
          <MobileTechStack translations={translations} />
        </div>
      </div>
    </>
  );
}
