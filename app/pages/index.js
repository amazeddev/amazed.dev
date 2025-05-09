import fs from "fs";
import path from "path";

import matter from "gray-matter";

import React, { useEffect } from "react";
import BlogPage from "../components/BlogPage";

export default function Home({ posts, language, page, setPage, translations }) {
  const currentPosts = posts.filter((post) => post.lang === language);
  useEffect(() => setPage(1), []);

  return (
    <BlogPage
      posts={currentPosts}
      page={page}
      setPage={setPage}
      translations={translations}
      language={language}
    />
  );
}

const constructLangPosts = (files, lang) => {
  return files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", lang, filename),
      "utf-8",
    );

    const { data: frontmatter } = matter(markdowWithMeta);
    return { slug, frontmatter, lang };
  });
};

export async function getStaticProps() {
  const enFiles = fs.readdirSync(path.join("posts", "en"));
  const plFiles = fs.readdirSync(path.join("posts", "pl"));

  return {
    props: {
      posts: [
        ...constructLangPosts(enFiles, "en"),
        ...constructLangPosts(plFiles, "pl"),
      ]
        .filter((post) => post.frontmatter.published)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
        ),
    },
  };
}
