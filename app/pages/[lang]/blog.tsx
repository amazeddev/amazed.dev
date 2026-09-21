import { GetStaticProps } from "next";
import BlogPage from "../../components/BlogPage";
import Seo from "../../components/Seo";
import { getI18nProps, getLangStaticPaths } from "../../lib/i18n";
import { getBlogPage } from "../../lib/posts";
import { BlogPageProps, Language, PageI18nProps } from "../../types";
import { pageAlternates } from "../../utils/i18n";

type BlogListProps = PageI18nProps &
  Pick<BlogPageProps, "posts" | "page" | "totalPages">;

export default function Blog({
  language,
  translations,
  alternates,
  posts,
  page,
  totalPages,
}: BlogListProps) {
  return (
    <>
      <Seo
        title="Blog - Amazed.DEV"
        description={translations.seo.blog}
        language={language}
        path="/blog"
        alternates={alternates}
      />
      <BlogPage
        posts={posts}
        page={page}
        totalPages={totalPages}
        language={language}
        translations={translations}
      />
    </>
  );
}

export const getStaticPaths = getLangStaticPaths;

export const getStaticProps: GetStaticProps<BlogListProps> = async ({
  params,
}) => {
  const lang = params?.lang as Language;

  return {
    props: {
      ...getI18nProps(lang, pageAlternates("/blog")),
      ...getBlogPage(lang, 1),
    },
  };
};
