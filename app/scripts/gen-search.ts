import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types";

const posts: Post[] = [];
["en", "pl"].forEach((lang: "en" | "pl") => {
  const files = fs.readdirSync(path.join("posts", lang));
  posts.push(
    ...files.map((filename: string) => {
      const slug = filename.replace(".md", "");

      const markdowWithMeta = fs.readFileSync(
        path.join("posts", lang, filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdowWithMeta);

      return { slug, frontmatter: frontmatter as Post["frontmatter"], lang };
    })
  );
});

fs.writeFileSync(
  "search.json",
  JSON.stringify(
    posts
      .filter((post) => post.frontmatter.published)
      .map(({ slug, frontmatter, lang }) => ({
        slug,
        frontmatter,
        lang,
      }))
  )
);
