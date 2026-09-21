import React from "react";
import { GetStaticProps } from "next";
import Seo from "../../components/Seo";
import DesktopTechStack from "../../components/DesktopTechStack";
import MobileTechStack from "../../components/MobileTechStack";
import { getI18nProps, getLangStaticPaths } from "../../lib/i18n";
import { Language, PageI18nProps } from "../../types";
import { pageAlternates } from "../../utils/i18n";
import { structText } from "../../utils/text";

export default function About({
  language,
  translations,
  alternates,
}: PageI18nProps) {
  return (
    <>
      <Seo
        title={`Amazed.DEV - ${translations.about.banner.title}`}
        description={translations.seo.about}
        language={language}
        path="/about"
        alternates={alternates}
      />
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
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = getLangStaticPaths;

export const getStaticProps: GetStaticProps<PageI18nProps> = async ({
  params,
}) => ({
  props: getI18nProps(params?.lang as Language, pageAlternates("/about")),
});
