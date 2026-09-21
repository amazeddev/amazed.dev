const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// The function file is plain script (CloudFront format), not a module.
const context = {};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, "rewrite-uri.js"), "utf8"),
  context
);

function run(uri, { cookie, acceptLanguage } = {}) {
  return context.handler({
    request: {
      uri,
      headers: acceptLanguage
        ? { "accept-language": { value: acceptLanguage } }
        : {},
      cookies: cookie ? { language: { value: cookie } } : {},
    },
  });
}
const location = (response) => response.headers.location.value;

test("language detection for the root", () => {
  const cases = [
    [{}, "/en"],
    [{ acceptLanguage: "pl-PL,pl;q=0.9,en;q=0.8" }, "/pl"],
    [{ acceptLanguage: "en-US,en;q=0.9,pl;q=0.5" }, "/en"],
    [{ cookie: "en", acceptLanguage: "pl-PL" }, "/en"],
    [{ cookie: "pl" }, "/pl"],
    [{ cookie: "constructor" }, "/en"],
  ];
  for (const [options, expected] of cases) {
    const response = run("/", options);
    assert.strictEqual(response.statusCode, 302, JSON.stringify(options));
    assert.strictEqual(location(response), expected, JSON.stringify(options));
    assert.strictEqual(response.headers["cache-control"].value, "no-store");
  }
});

test("language-neutral pages redirect with the detected language", () => {
  const options = { acceptLanguage: "pl" };
  for (const uri of ["/about", "/projects", "/blog", "/projects/trackforge"]) {
    const response = run(uri, options);
    assert.strictEqual(response.statusCode, 302, uri);
    assert.strictEqual(location(response), `/pl${uri}`, uri);
  }
});

test("legacy blog URLs are moved permanently", () => {
  const cases = [
    ["/blog/en/api-testing", "/en/blog/api-testing"],
    ["/blog/pl/numpy-basics-1", "/pl/blog/numpy-basics-1"],
    ["/blog/en/pages/2", "/en/blog/pages/2"],
    ["/blog/pl/tag/node", "/pl/blog/tag/node"],
    ["/blog/en", "/en/blog"],
    ["/blog/some-old-slug", "/en/blog/some-old-slug"],
  ];
  for (const [from, to] of cases) {
    const response = run(from, { acceptLanguage: "pl" });
    assert.strictEqual(response.statusCode, 301, from);
    assert.strictEqual(location(response), to, from);
  }
});

test("exported pages get .html", () => {
  const cases = [
    ["/en", "/en.html"],
    ["/en/about", "/en/about.html"],
    ["/pl/blog/pages/2/", "/pl/blog/pages/2.html"],
    ["/en/blog/tag/node", "/en/blog/tag/node.html"],
    ["/de/anything", "/de/anything.html"], // unknown language -> S3 404
  ];
  for (const [from, to] of cases) {
    assert.strictEqual(run(from).uri, to, from);
  }
});

test("files with an extension pass through untouched", () => {
  for (const uri of [
    "/images/profile.webp",
    "/_next/static/chunks/main.js",
    "/_next/data/abc/en/about.json",
    "/sitemap.xml",
    "/robots.txt",
    "/SebastianLuszczek_CV.pdf",
  ]) {
    assert.strictEqual(run(uri).uri, uri, uri);
  }
});
