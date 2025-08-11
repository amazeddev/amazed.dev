import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import PostItem from "../../../../components/PostItem";
import { slugify } from "../../../../utils/posts";
import { TagPageProps, TagPageParams, Post } from "../../../../types";

export default function TagPage({ posts, tag, lang }: TagPageProps) {
  return (
    <div>
      <div className="container-content">
        <Head>
          <title>Amazed.DEV - #{tag}</title>
        </Head>
        <h1 className="post-title">#{tag}</h1>

        <div className="cards">
          {posts.map((post, index) => (
            <PostItem
              post={post}
              key={index}
              language={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  let tags: Array<{ tag: string; lang: "en" | "pl" }> = [];
  ["en", "pl"].forEach((lang) => {
    fs.readdirSync(path.join("posts", lang)).map((filename) => {
      const markdowWithMeta = fs.readFileSync(
        path.join("posts", lang, filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdowWithMeta);
      if (frontmatter.tags) {
        tags.push(
          ...frontmatter.tags.map((tag: string) => ({
            tag: slugify(tag),
            lang,
          }))
        );
      }
      return null;
    });
  });

  return {
    paths: Array.from(new Set(tags.filter((tag) => tag.tag))).map((tag) => ({
      params: { tag: tag.tag, lang: tag.lang },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag, lang } }: TagPageParams) {
  const files = fs.readdirSync(path.join("posts", lang));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", lang, filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdowWithMeta);
    const tags = frontmatter.tags
      ? frontmatter.tags.map((tag: string) => slugify(tag))
      : undefined;
    if (tags && tags.includes(tag)) {
      return {
        slug,
        frontmatter: {
          ...(frontmatter as Post["frontmatter"]),
          tags,
        },
        lang,
      };
    }
    return null;
  });

  return {
    props: {
      posts: posts
        .filter(
          (post): post is Post => post !== null && post.frontmatter.published
        )
        .sort(
          (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
        ),
      tag,
      lang,
    },
  };
}
