// Edge routing for the statically exported site (S3 website origin).
//
// - language-neutral URLs (/, /about, ...) are redirected to /{lang}/...
//   using the "language" cookie, then Accept-Language, then "en";
// - URLs from before the language prefix (/blog/{lang}/...) are moved
//   permanently to their new place;
// - exported pages are mapped onto files: /en/about -> /en/about.html.
//
// next.config.js redirects()/headers() and middleware do not run with
// `output: "export"`, which is why this lives here.

function isLanguage(value) {
  return value === "en" || value === "pl";
}

function detectLanguage(request) {
  var cookie = request.cookies && request.cookies.language;
  if (cookie && isLanguage(cookie.value)) {
    return cookie.value;
  }

  var header = request.headers["accept-language"];
  if (header && header.value.trim().toLowerCase().indexOf("pl") === 0) {
    return "pl";
  }

  return "en";
}

function redirect(location, permanent) {
  return {
    statusCode: permanent ? 301 : 302,
    statusDescription: permanent ? "Moved Permanently" : "Found",
    headers: {
      location: { value: location },
      "cache-control": {
        value: permanent ? "public, max-age=3600" : "no-store",
      },
    },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Treat /about/ and /about as the same page.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === "/") {
    uri = uri.slice(0, -1);
  }

  // Assets and already-exported files pass through untouched.
  var lastSegment = uri.slice(uri.lastIndexOf("/") + 1);
  if (lastSegment.indexOf(".") !== -1) {
    return request;
  }

  // Legacy blog URLs: /blog/{lang}/... and the oldest /blog/{slug}.
  var legacy = uri.match(/^\/blog\/(en|pl)(\/.*)?$/);
  if (legacy) {
    return redirect("/" + legacy[1] + "/blog" + (legacy[2] || ""), true);
  }
  var oldSlug = uri.match(/^\/blog\/([^\/]+)$/);
  if (oldSlug) {
    return redirect("/en/blog/" + oldSlug[1], true);
  }

  // Language-neutral entry points.
  if (uri === "/" || /^\/(about|projects|blog)(\/|$)/.test(uri)) {
    var target = uri === "/" ? "" : uri;
    return redirect("/" + detectLanguage(request) + target, false);
  }

  // Exported page. Unknown paths miss in S3 and get the real 404 page.
  request.uri = uri + ".html";
  return request;
}
