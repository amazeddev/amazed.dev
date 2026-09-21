import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Seo from "../../../components/Seo";
import { projects, Project } from "../../../data/projects";
import { getI18nProps } from "../../../lib/i18n";
import { Language, ProjectDetailProps } from "../../../types";
import {
  LANGUAGES,
  SITE_URL,
  localePath,
  pageAlternates,
} from "../../../utils/i18n";
import { structText } from "../../../utils/text";

export default function ProjectDetail({
  project,
  translations,
  language,
  alternates,
}: ProjectDetailProps) {
  const content = project[language];

  return (
    <>
      <Seo
        title={`Amazed.DEV - ${content.title}`}
        description={content.tagline}
        language={language}
        path={`/projects/${project.slug}`}
        alternates={alternates}
        image={`${SITE_URL}${project.image}`}
      />
      <div className="post">
        <div className="post-baner">
          <img src={project.image} alt={content.title} width={700} height={500} />
          <div className="post-info">
            <h1 className="post-title">{content.title}</h1>
            <p>{content.tagline}</p>
            <div className="tags">
              {content.tech.map((tech) => (
                <div className="tag-btn" key={tech}>
                  #{tech}
                </div>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">
                {translations.projects.visitSite}
              </button>
            </a>
          </div>
        </div>
        <div className="post-body">{structText(content.description)}</div>
        <Link href={localePath(language, "/projects")}>
          {`← ${translations.projects.backToProjects}`}
        </Link>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: LANGUAGES.flatMap((lang) =>
    projects.map((project) => ({ params: { lang, slug: project.slug } }))
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProjectDetailProps> = async ({
  params,
}) => {
  const project = projects.find((p) => p.slug === params?.slug) as Project;

  return {
    props: {
      ...getI18nProps(
        params?.lang as Language,
        pageAlternates(`/projects/${project.slug}`)
      ),
      project,
    },
  };
};
