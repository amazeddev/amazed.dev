const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt?: string;
    date: string;
    tags: string[];
    cover_img?: string;
    published: boolean;
    author?: string;
    description?: string;
  };
  lang: "en" | "pl";
}

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
