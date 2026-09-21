import { GetStaticProps } from "next";
import Seo from "../../components/Seo";
import { getI18nProps, getLangStaticPaths } from "../../lib/i18n";
import { Language, PageI18nProps } from "../../types";
import { pageAlternates } from "../../utils/i18n";
import { structText } from "../../utils/text";

export default function Home({
  language,
  translations,
  alternates,
}: PageI18nProps) {
  const { title } = translations.main;

  return (
    <>
      <Seo
        title="Sebastian Luszczek - Senior Backend Developer | Amazed.DEV"
        description={translations.seo.home}
        language={language}
        path=""
        alternates={alternates}
      />
      <div className="container-content">
        <div className="home">
          <div className="banner">
            <div>
              <h1 className="title">
                {title.lead} <span className="highlight">{title.highlight}</span>
                <br /> {title.tail}
              </h1>
              <>{structText(translations.main.banner.paragraph)}</>

              <a
                href="/SebastianLuszczek_CV.pdf"
                download="Sebastian_Luszczek_CV.pdf"
              >
                <button className="cv-btn">{translations.main.cvBtn}</button>
              </a>
            </div>
            <div className="about-image">
              <img
                src="/images/profile.webp"
                alt="Sebastian Luszczek - Senior Backend Developer"
                title="AmazedDEV"
              />
            </div>
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
  props: getI18nProps(params?.lang as Language, pageAlternates()),
});
