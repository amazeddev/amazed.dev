import Link from "next/link";
import { GetStaticProps } from "next";
import Seo from "../../components/Seo";
import { projects } from "../../data/projects";
import { getI18nProps, getLangStaticPaths } from "../../lib/i18n";
import { Language, ProjectsPageProps } from "../../types";
import { localePath, pageAlternates } from "../../utils/i18n";

export default function Projects({
  translations,
  language,
  alternates,
}: ProjectsPageProps) {
  return (
    <>
      <Seo
        title={`Amazed.DEV - ${translations.projects.banner.title}`}
        description={translations.seo.projects}
        language={language}
        path="/projects"
        alternates={alternates}
      />
      <div className="container-content">
        <div className="projects">
          <div className="projects-banner">
            <h1 className="post-title">{translations.projects.banner.title}</h1>
            <p>{translations.projects.banner.paragraph}</p>
          </div>

          <div className="cards">
            {projects.map((project) => {
              const content = project[language];
              return (
                <Link
                  href={localePath(language, `/projects/${project.slug}`)}
                  key={project.slug}
                >
                  <div className="card">
                    <div className="card-hero">
                      <img
                        src={project.image}
                        alt={content.title}
                        width={600}
                        height={400}
                      />
                      <div className="card-hero-overlay">
                        <h2>{content.title}</h2>
                      </div>
                    </div>
                    <div className="card-content">
                      <p>{content.tagline}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = getLangStaticPaths;

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async ({
  params,
}) => ({
  props: getI18nProps(params?.lang as Language, pageAlternates("/projects")),
});
