// Server-only helpers (getStaticProps / getStaticPaths). Do not import in components.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language, Post } from "../types";
import { LANGUAGES } from "../utils/i18n";
import { POSTS_PER_PAGE, pageCount, slugify } from "../utils/posts";

const byNewestFirst = (a: Post, b: Post) =>
  new Date(b.frontmatter.date).getTime() -
  new Date(a.frontmatter.date).getTime();

export function getPostsByLang(lang: Language): Post[] {
  return fs
    .readdirSync(path.join("posts", lang))
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", lang, filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug: filename.replace(".md", ""),
        frontmatter: frontmatter as Post["frontmatter"],
        lang,
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort(byNewestFirst);
}

export function getAllPosts(): Post[] {
  return LANGUAGES.flatMap(getPostsByLang).sort(byNewestFirst);
}

export function getTagsByLang(lang: Language): string[] {
  const tags = getPostsByLang(lang).flatMap((post) =>
    (post.frontmatter.tags || []).map(slugify)
  );

  return Array.from(new Set(tags)).filter(Boolean);
}

export function getBlogPage(lang: Language, page: number) {
  const all = getPostsByLang(lang);

  return {
    posts: all.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    page,
    totalPages: pageCount(all.length),
  };
}
