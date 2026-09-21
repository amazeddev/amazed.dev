# Amazed.DEV - Personal Development Blog

A multilingual (English / Polish) portfolio and blog focused on software development, built with Next.js and exported as a static site to AWS (S3 + CloudFront).

## 🚀 Features

- **Language in the URL**: every page lives under `/en/...` or `/pl/...`; the HTML is generated in the right language, no JavaScript needed to know it
- **Language switcher that knows about translations**: it links to the same page in the other language, and is disabled when a post has no counterpart
- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **Dark Theme**: Modern dark UI with elegant styling
- **Search Functionality**: Fast client-side search through blog posts
- **Markdown Blog Posts**: Write content in Markdown with syntax highlighting, tags and pagination
- **Projects**: Showcase pages for shipped products (`data/projects.ts`)
- **Tech Stack Showcase**: Interactive about page with technology icons
- **SEO**: canonical URLs, `hreflang`, Open Graph / Twitter tags, JSON-LD and a sitemap with language alternates
- **Static Site Generation**: `next build` with `output: "export"`

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** (Pages Router, static export) - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **SASS/SCSS** - Styling
- **FontAwesome** - Icon library

### Content

- **Markdown** with YAML frontmatter, parsed by **Gray Matter**
- **unified / remark** with **remark-prism** - Markdown to HTML with syntax highlighting

### Infrastructure

- **AWS**: S3 (website origin), CloudFront, ACM, Route 53
- **Terraform** - all infrastructure as code (`terraform/`)
- **CloudFront Function** - language redirects and URL rewriting (`terraform/functions/rewrite-uri.js`)
- **GitHub Actions** - build, checks and deploy (`.github/workflows/deploy.yml`)

## 📁 Project Structure

```
app/
├── components/          # React components (Header, Seo, PostItem, ...)
├── data/                # Content that is not Markdown
│   ├── projects.ts      # Projects shown on /projects (EN + PL)
│   └── translations.json# UI strings, both languages
├── lib/                 # Server-only helpers (used in getStaticProps)
│   ├── i18n.ts          # Translations and language counterparts
│   └── posts.ts         # Reading posts, tags and pages from posts/
├── pages/
│   ├── [lang]/          # Every content page: /en/..., /pl/...
│   │   ├── index.tsx    # /en, /pl
│   │   ├── about.tsx
│   │   ├── projects.tsx, projects/[slug].tsx
│   │   └── blog.tsx, blog/[slug].tsx, blog/pages/[page].tsx, blog/tag/[tag].tsx
│   ├── index.tsx        # Fallback redirect for "/" (dev only, see below)
│   ├── 404.tsx          # Bilingual not-found page
│   └── _app.tsx, _document.tsx
├── posts/               # Markdown blog posts
│   ├── en/
│   └── pl/
├── public/              # Static assets (images, CV, sitemap.xml, robots.txt)
├── scripts/             # gen-search, gen-sitemap, check-export
├── styles/              # SCSS stylesheets
├── types/               # Shared TypeScript types
└── utils/               # Helpers shared by client and server (i18n, posts, text)
terraform/               # S3, CloudFront, ACM, Route 53
└── functions/           # CloudFront Function and its tests
```

## 🌍 Routing and Languages

| URL                                   | Page                                          |
| ------------------------------------- | --------------------------------------------- |
| `/`                                   | Redirects to `/en` or `/pl` (see below)       |
| `/en`, `/pl`                          | Home                                          |
| `/{lang}/about`, `/{lang}/projects`   | About, projects (`/projects/{slug}` details)  |
| `/{lang}/blog`                        | Blog, page 1                                  |
| `/{lang}/blog/pages/{n}`              | Blog, page 2 and up                           |
| `/{lang}/blog/{slug}`                 | A post                                        |
| `/{lang}/blog/tag/{tag}`              | Posts with a tag                              |

**How the language is chosen.** The URL is the source of truth. Every page returns `{ language, translations, alternates }` from `getStaticProps` (see `lib/i18n.ts`); `alternates` holds the address of the same page in the other language, or `null` when it does not exist. That is what drives the language switcher, `hreflang` tags and the sitemap.

**Visiting a language-less address** (`/`, `/about`, `/projects`, `/blog`): the CloudFront Function redirects (302) to the right language, using the `language` cookie, then the browser's `Accept-Language`, then English. The switcher sets that cookie when clicked, so the choice is remembered. Old URLs from before the language prefix (`/blog/en/{slug}` and the like) are moved permanently (301).

**Not in production:** middleware, `redirects()` and `headers()` from `next.config.js` do not run with `output: "export"`. That is why routing lives in the CloudFront Function, and why `pages/index.tsx` exists - it is a client-side fallback for `npm run dev`, where no CloudFront sits in front of the app.

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:amazeddev/amazed.dev.git
cd amazed.dev/app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3333](http://localhost:3333) - it sends you to `/en` or `/pl`

### Available Scripts

Run from `app/`:

- `npm run dev` - Start development server on port 3333
- `npm run build` - Build the static site into `out/`
- `npm run lint` - Run ESLint
- `npm run gen-search` - Regenerate `search.json` (the client-side search index)
- `npm run gen-sitemap` - Regenerate `public/sitemap.xml`
- `npm run test:edge` - Test the CloudFront Function (`node --test`)
- `npm run check-export` - Check `out/` after a build (see below)

## 📝 Content Management

### Adding Blog Posts

1. Create a Markdown file in `posts/en/` and/or `posts/pl/`
2. Add frontmatter metadata:

```markdown
---
title: Your Post Title
excerpt: Brief description of the post
date: January 1, 2024
tags: [javascript, react, tutorial]
cover_img: your-image.jpg
published: true
---

Your content here...
```

3. Run `npm run gen-search` and `npm run gen-sitemap`
4. The post appears on the blog, in tag pages, in search and in the sitemap

**Translations of a post.** A post in both languages must use the **same file name** (the slug) in `posts/en/` and `posts/pl/`. That is what links them: the language switcher jumps between the two versions and `hreflang` is emitted. A post that exists in only one language still works - its switcher entry for the other language is disabled with a hint.

`published: false` keeps a post out of every page, tag, search result and the sitemap.

### Supported Frontmatter Fields

- `title` - Post title
- `excerpt` - Short description for previews and meta description
- `date` - Publication date
- `tags` - Array of tags for categorization
- `cover_img` - Featured image filename in `public/images/posts/`
- `published` - Boolean to control visibility
- `author` - Optional, defaults to Sebastian Luszczek

### Adding Projects

Add an entry to `data/projects.ts` with `en` and `pl` content. It gets a card on `/{lang}/projects`, its own detail page and a sitemap entry.

## 🎨 Customization

### Styling

- Main styles are in `styles/globals.scss`
- Uses CSS custom properties for theming
- Responsive breakpoints defined for mobile/desktop

### Translations

- UI strings live in `data/translations.json`, under `en` and `pl` with the same keys; the `Translation` type in `types/index.ts` describes the shape
- `<title>`, meta and Open Graph tags go through `components/Seo.tsx`; use it in every new page instead of writing them by hand
- A new page under `pages/[lang]/` needs `getStaticPaths = getLangStaticPaths` and a `getStaticProps` returning `getI18nProps(lang, alternates)`
- A new language means extending `LANGUAGES` (`utils/i18n.ts`), the `Language` type, `data/translations.json` and the CloudFront Function

## 🔧 Configuration

### Search Functionality

The search feature uses a pre-generated JSON index created by `scripts/gen-search.ts`. It contains the frontmatter (title, tags, ...) of every published post in both languages, and the modal filters it by the current language. There is no Git hook for it: run `npm run gen-search` after changing posts (the CI does it too).

### Export Checks

`npm run check-export` inspects `out/` after a build and fails on:

- `<html lang>` that does not match the language in the path
- a missing or wrong canonical URL
- `hreflang` that is not reciprocal, or points at a page that does not exist
- internal links and images that point at files that do not exist
- a link inside a link (invalid HTML)

## 🚀 Deployment

Every push to `master` runs `.github/workflows/deploy.yml`:

1. **Build job** (also on pull requests): `npm ci`, type check, `test:edge`, `gen-search`, `gen-sitemap`, `build`, `check-export`
2. **Deploy job** (master only): Terraform init / validate / plan, **sync to S3**, Terraform apply, CloudFront invalidation

Content goes to S3 before `terraform apply` on purpose: the CloudFront Function redirects to `/{lang}/...` files, which have to exist when it goes live.

**Caching.** `/_next/static/*` (hashed files) is cached for a year and marked `immutable`. Everything else is uploaded with `max-age=0,must-revalidate`, so a changed post reaches readers at once.

**Routing at the edge.** `terraform/functions/rewrite-uri.js` maps `/en/about` to `/en/about.html`, does the language redirects and migrates old URLs. Unknown paths miss in S3 and get the real `404.html` with status 404. Test it with `npm run test:edge` before changing it.

**Security headers** (HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`) are set by a CloudFront response headers policy. The **Content-Security-Policy is Report-Only** for now: open the live site with the browser console and look for `Content-Security-Policy-Report-Only` violations. When the console is clean, move the policy from `custom_headers_config` to an enforced `content_security_policy` block in `terraform/cloudfront.tf`.

After a deploy that changes URLs, submit `https://amazed.dev/sitemap.xml` again in Google Search Console.

## 📧 Contact

**Sebastian Łuszczek**

- Website: [amazed.dev](https://amazed.dev)
- Twitter: [@AmazedDeveloper](https://twitter.com/AmazedDeveloper)
- GitHub: [amazeddev](https://github.com/amazeddev)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

_This blog serves as documentation of my learning process and provides reference material for software development concepts, focusing on backend development with Node.js, TypeScript, and modern web technologies._
