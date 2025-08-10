# Amazed.DEV - Personal Development Blog

A modern, multilingual personal website and blog focused on software development, built with Next.js and featuring a clean, responsive design.

## 🚀 Features

- **Multilingual Support**: Available in English and Polish with seamless language switching
- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **Dark Theme**: Modern dark UI with elegant styling
- **Search Functionality**: Fast client-side search through blog posts
- **Markdown Blog Posts**: Write content in Markdown with syntax highlighting
- **Tech Stack Showcase**: Interactive about page with technology icons
- **SEO Optimized**: Proper meta tags and structured data
- **Static Site Generation**: Built with Next.js for optimal performance

## 🛠️ Tech Stack

### Frontend

- **Next.js 12** - React framework for production
- **React 18** - UI library
- **SASS/SCSS** - Advanced CSS preprocessing
- **FontAwesome** - Icon library

### Content Management

- **Markdown** - Content authoring with frontmatter
- **Gray Matter** - YAML frontmatter parser
- **Prism.js** - Syntax highlighting for code blocks
- **Remark/Rehype** - Markdown processing pipeline

### Internationalization

- **Next-i18next** - Internationalization framework
- **React-i18next** - React bindings for i18n

### Development Tools

- **ESLint** - Code linting
- **Husky** - Git hooks for automation
- **Sass** - CSS preprocessing

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation with burger menu
│   ├── Footer.js       # Site footer
│   ├── SearchModal.js  # Search functionality
│   └── ...
├── pages/              # Next.js pages
│   ├── blog/           # Blog post routing
│   ├── about.js        # About page
│   └── index.js        # Homepage
├── posts/              # Markdown blog posts
│   ├── en/             # English posts
│   └── pl/             # Polish posts
├── public/             # Static assets
│   ├── images/         # Blog images and assets
│   └── locales/        # Translation files
├── styles/             # SCSS stylesheets
│   ├── globals.scss    # Global styles
│   └── ...
├── utils/              # Utility functions
├── scripts/            # Build and automation scripts
└── lib/                # Core functionality
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/amazed.dev.git
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

4. Open [http://localhost:3333](http://localhost:3333) in your browser

### Available Scripts

- `npm run dev` - Start development server on port 3333
- `npm run build` - Build and export static site
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run gen-search` - Generate search index

## 📝 Content Management

### Adding Blog Posts

1. Create a new Markdown file in `posts/en/` or `posts/pl/`
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

3. Run `npm run gen-search` to update the search index
4. The post will automatically appear on the blog

### Supported Frontmatter Fields

- `title` - Post title
- `excerpt` - Short description for previews
- `date` - Publication date
- `tags` - Array of tags for categorization
- `cover_img` - Featured image filename
- `published` - Boolean to control visibility

## 🎨 Customization

### Styling

- Main styles are in `styles/globals.scss`
- Uses CSS custom properties for theming
- Responsive breakpoints defined for mobile/desktop

### Translations

- Add new languages in `public/locales/translations.json`
- Update `i18n.js` configuration
- Language switcher automatically detects available languages

## 🔧 Configuration

### Search Functionality

The search feature uses a pre-generated JSON index created by `scripts/gen-search.ts`. This script:

- Indexes all published blog posts
- Extracts searchable content from Markdown
- Creates a client-side search database

### Git Hooks

Husky is configured to automatically regenerate the search index on commit:

```json
"pre-commit": "npm run gen-search && git add search.json"
```

## 🚀 Deployment

The site is configured for static export:

```bash
npm run build
```

This generates a static site in the `out/` directory that can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 📧 Contact

**Sebastian Łuszczek**

- Website: [amazed.dev](https://amazed.dev)
- Twitter: [@amazed_dev](https://twitter.com/amazed_dev)
- GitHub: [Your GitHub](https://github.com/yourusername)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

_This blog serves as documentation of my learning process and provides reference material for software development concepts, focusing on backend development with Node.js, TypeScript, and modern web technologies._
