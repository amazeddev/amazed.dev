import { GetStaticPaths, GetStaticProps } from "next";
import PostItem from "../../../../components/PostItem";
import Seo from "../../../../components/Seo";
import { getI18nProps, tagAlternates } from "../../../../lib/i18n";
import { getPostsByLang, getTagsByLang } from "../../../../lib/posts";
import { Language, TagPageProps } from "../../../../types";
import { LANGUAGES } from "../../../../utils/i18n";
import { slugify } from "../../../../utils/posts";

export default function TagPage({
  posts,
  tag,
  language,
  translations,
  alternates,
}: TagPageProps) {
  return (
    <div className="container-content">
      <Seo
        title={`Amazed.DEV - #${tag}`}
        description={`#${tag} - ${translations.seo.blog}`}
        language={language}
        path={`/blog/tag/${tag}`}
        alternates={alternates}
      />
      <h1 className="post-title">#{tag}</h1>

      <div className="cards">
        {posts.map((post) => (
          <PostItem post={post} key={post.slug} language={language} />
        ))}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: LANGUAGES.flatMap((lang) =>
    getTagsByLang(lang).map((tag) => ({ params: { lang, tag } }))
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const lang = params?.lang as Language;
  const tag = params?.tag as string;
  const posts = getPostsByLang(lang)
    .map((post) => ({
      ...post,
      frontmatter: {
        ...post.frontmatter,
        tags: (post.frontmatter.tags || []).map(slugify),
      },
    }))
    .filter((post) => post.frontmatter.tags.includes(tag));

  return { props: { ...getI18nProps(lang, tagAlternates(tag)), posts, tag } };
};
