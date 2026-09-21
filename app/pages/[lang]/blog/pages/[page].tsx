import { GetStaticPaths, GetStaticProps } from "next";
import BlogPage from "../../../../components/BlogPage";
import Seo from "../../../../components/Seo";
import { getI18nProps } from "../../../../lib/i18n";
import { getBlogPage } from "../../../../lib/posts";
import { BlogPageProps, Language, PageI18nProps } from "../../../../types";
import { LANGUAGES, localePath } from "../../../../utils/i18n";

type BlogListProps = PageI18nProps &
  Pick<BlogPageProps, "posts" | "page" | "totalPages">;

export default function BlogPaginatedPage({
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
        title={`Blog (${page}/${totalPages}) - Amazed.DEV`}
        description={translations.seo.blog}
        language={language}
        path={`/blog/pages/${page}`}
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

// Page 1 lives at /{lang}/blog, so numbered pages start at 2.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: LANGUAGES.flatMap((lang) =>
    Array.from(
      { length: Math.max(getBlogPage(lang, 1).totalPages - 1, 0) },
      (_, index) => ({ params: { lang, page: `${index + 2}` } })
    )
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogListProps> = async ({
  params,
}) => {
  const lang = params?.lang as Language;
  const page = Number(params?.page);
  // The other language may have fewer pages - then there is no counterpart.
  const alternate = (other: Language) =>
    page <= getBlogPage(other, 1).totalPages
      ? localePath(other, `/blog/pages/${page}`)
      : null;

  return {
    props: {
      ...getI18nProps(lang, { en: alternate("en"), pl: alternate("pl") }),
      ...getBlogPage(lang, page),
    },
  };
};
