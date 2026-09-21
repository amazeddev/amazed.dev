// Sanity checks on the static export (`out/`). Run after `npm run build`.
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");
const SITE = "https://amazed.dev";
const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "_next" ? [] : walk(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

// out/en/blog/x.html -> "/en/blog/x"
const toUrl = (file) => "/" + path.relative(OUT, file).replace(/\.html$/, "");

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return match ? match[1] : null;
};

const isFile = (candidate) =>
  fs.existsSync(candidate) && fs.statSync(candidate).isFile();

function targetExists(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return true;
  const rel = clean.replace(/^\//, "");
  return [rel, `${rel}.html`, path.join(rel, "index.html")].some((candidate) =>
    isFile(path.join(OUT, candidate))
  );
}

const files = walk(OUT);
const pages = new Map(); // url -> { hreflang: absolute href }

for (const file of files) {
  const rel = path.relative(OUT, file);
  const url = toUrl(file);
  const html = fs.readFileSync(file, "utf8");

  // Internal links and images must point at files that exist.
  for (const match of html.matchAll(
    /<(?:a|img)\s[^>]*?(?:href|src)="(\/[^"]*)"/g
  )) {
    if (!match[1].startsWith("//") && !targetExists(match[1])) {
      fail(rel, `broken internal reference ${match[1]}`);
    }
  }

  // Invalid HTML: an anchor inside an anchor.
  if (/<a\s[^>]*>(?:(?!<\/a>)[\s\S])*<a\s/.test(html)) {
    fail(rel, "nested <a> elements");
  }

  const langMatch = url.match(/^\/(en|pl)(\/|$)/);
  if (!langMatch) continue; // /index and /404 are not language pages

  const lang = langMatch[1];
  const htmlLang = (html.match(/<html[^>]*\slang="([^"]*)"/) || [])[1];
  if (htmlLang !== lang) {
    fail(rel, `<html lang="${htmlLang}"> should be "${lang}"`);
  }

  const links = html.match(/<link\s[^>]*>/g) || [];
  const canonical = links.find((tag) => attr(tag, "rel") === "canonical");
  if (!canonical) {
    fail(rel, "missing canonical");
  } else if (attr(canonical, "href") !== SITE + url) {
    fail(rel, `canonical ${attr(canonical, "href")} should be ${SITE + url}`);
  }

  const alternates = {};
  for (const tag of links) {
    if (attr(tag, "rel") === "alternate" && attr(tag, "hreflang")) {
      alternates[attr(tag, "hreflang")] = attr(tag, "href");
    }
  }
  pages.set(url, alternates);
}

// hreflang must be reciprocal: if A points at B, B must point back at A.
for (const [url, alternates] of pages) {
  const own = url.split("/")[1];
  for (const lang of ["en", "pl"]) {
    if (lang === own || !alternates[lang]) continue;
    const targetUrl = alternates[lang].replace(SITE, "");
    const back = pages.get(targetUrl);
    if (!back) {
      fail(url, `hreflang ${lang} points at missing page ${targetUrl}`);
    } else if (back[own] !== SITE + url) {
      fail(url, `${targetUrl} does not link back with hreflang ${own}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\ncheck-export: ${errors.length} problem(s)`);
  process.exit(1);
}
console.log(`check-export: ${files.length} pages OK`);
