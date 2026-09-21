const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BASE_URL = "https://amazed.dev";
const LANGS = ["en", "pl"];
const TODAY = new Date().toISOString().split("T")[0];

// W3C datetime; post dates are free-form strings such as "January 15, 2023".
const toLastmod = (date) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? TODAY
    : parsed.toISOString().split("T")[0];
};

// slug -> { en?: lastmod, pl?: lastmod } for published posts only
const getPosts = () => {
  const posts = {};
  LANGS.forEach((lang) => {
    fs.readdirSync(path.join("posts", lang)).forEach((filename) => {
      const { data } = matter(
        fs.readFileSync(path.join("posts", lang, filename), "utf-8")
      );
      if (data.published) {
        const slug = filename.replace(".md", "");
        posts[slug] = { ...posts[slug], [lang]: toLastmod(data.date) };
      }
    });
  });
  return posts;
};

// Project slugs are read from data/projects.ts without compiling TypeScript.
const getProjectSlugs = () => {
  const source = fs.readFileSync(path.join("data", "projects.ts"), "utf-8");
  return [...source.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
};

// One <url> per language variant, each listing all variants as alternates.
const variants = (paths, meta) => {
  const present = LANGS.filter((lang) => paths[lang]);
  const alternates = present.map((lang) => ({
    hreflang: lang,
    href: BASE_URL + paths[lang],
  }));
  if (meta.xDefault) {
    alternates.push({ hreflang: "x-default", href: BASE_URL + "/" });
  }

  return present.map((lang) => ({
    loc: BASE_URL + paths[lang],
    lastmod: meta.lastmod[lang] || TODAY,
    changefreq: meta.changefreq,
    priority: meta.priority,
    alternates: present.length > 1 ? alternates : [],
  }));
};

const both = (suffix) => ({ en: `/en${suffix}`, pl: `/pl${suffix}` });
const today = { en: TODAY, pl: TODAY };
const page = (suffix, changefreq, priority, extra = {}) =>
  variants(both(suffix), { lastmod: today, changefreq, priority, ...extra });

const entries = [
  ...page("", "weekly", "1.0", { xDefault: true }),
  ...page("/blog", "daily", "0.9"),
  ...page("/projects", "monthly", "0.9"),
  ...page("/about", "monthly", "0.8"),
  ...getProjectSlugs().flatMap((slug) =>
    page(`/projects/${slug}`, "monthly", "0.8")
  ),
  ...Object.entries(getPosts()).flatMap(([slug, lastmod]) => {
    const paths = {};
    Object.keys(lastmod).forEach(
      (lang) => (paths[lang] = `/${lang}/blog/${slug}`)
    );
    return variants(paths, { lastmod, changefreq: "monthly", priority: "0.7" });
  }),
];

const urlEntry = (entry) => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${entry.alternates
  .map(
    (alt) =>
      `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
  )
  .join("")}
  </url>`;

fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries
    .map(urlEntry)
    .join("")}
</urlset>
`
);
console.log(`Sitemap generated successfully! (${entries.length} URLs)`);
