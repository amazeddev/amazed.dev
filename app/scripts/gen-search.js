const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const files = fs.readdirSync(path.join("posts"));

const posts = files.map((filename) => {
  const slug = filename.replace(".md", "");

  const markdowWithMeta = fs.readFileSync(
    path.join("posts", filename),
    "utf-8"
  );

  const { data: frontmatter } = matter(markdowWithMeta);

  return { slug, frontmatter };
});

fs.writeFileSync(
  "search.json",
  JSON.stringify(
    posts
      .filter((post) => post.frontmatter.published)
      .map(({ slug, frontmatter }) => ({
        slug,
        frontmatter,
      }))
  )
);
