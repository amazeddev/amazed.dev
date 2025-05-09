const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const posts = [];
["en", "pl"].forEach((lang) => {
  const files = fs.readdirSync(path.join("posts", lang));
  posts.push(
    ...files.map((filename) => {
      const slug = filename.replace(".md", "");

      const markdowWithMeta = fs.readFileSync(
        path.join("posts", lang, filename),
        "utf-8",
      );

      const { data: frontmatter } = matter(markdowWithMeta);

      return { slug, frontmatter, lang };
    }),
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
      })),
  ),
);
