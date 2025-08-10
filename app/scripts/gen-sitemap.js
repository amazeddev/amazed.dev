const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Get all blog posts
const getPosts = () => {
  const posts = [];
  ["en", "pl"].forEach((lang) => {
    const files = fs.readdirSync(path.join("posts", lang));
    files.forEach((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", lang, filename),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);

      if (frontmatter.published) {
        posts.push({
          slug,
          lang,
          date: frontmatter.date,
          lastmod: frontmatter.date, // You could add a lastModified field to frontmatter
        });
      }
    });
  });
  return posts;
};

// Generate sitemap XML
const generateSitemap = () => {
  const posts = getPosts();
  const baseUrl = "https://amazed.dev";

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add blog posts
  posts.forEach((post) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.lang}/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const sitemap = generateSitemap();
fs.writeFileSync("public/sitemap.xml", sitemap);
console.log("Sitemap generated successfully!");
