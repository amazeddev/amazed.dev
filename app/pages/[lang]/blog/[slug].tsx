import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import prism from "remark-prism";
import { codeTitle, copyCode } from "../../../utils/code-blocks";
import Link from "next/link";
import { slugify } from "../../../utils/posts";
import React, { useEffect } from "react";
import { ShareButtons } from "../../../components/ShareButtons";
import Seo from "../../../components/Seo";
import { getI18nProps, postAlternates } from "../../../lib/i18n";
import { getAllPosts } from "../../../lib/posts";
import { SITE_URL, localePath } from "../../../utils/i18n";
import { PostPageProps, GetStaticPropsParams } from "../../../types";

export default function PostPage({
  frontmatter,
  parsed,
  slug,
  language,
  alternates,
}: PostPageProps) {
  useEffect(() => {
    // Code block functionality
    (async () => {
      // use a class selector if available
      let blocks = document.querySelectorAll(".remark-highlight");

      blocks.forEach((block) => {
        // only add button if browser supports Clipboard API
        if (navigator.clipboard && block) {
          const title = block.previousElementSibling;
          if (title && title.className === "remark-code-title") {
            let button = document.createElement("button");

            // button.innerText = "";
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H48C21.5 64 0 85.5 0 112V464c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H282.5C269.4 26.7 233.8 0 192 0zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm-80 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>`;
            button.className = "copy-btn";
            title.insertBefore(button, title.children[0]);

            button.addEventListener("click", async () => {
              await copyCode(block);
            });
          }
        }
      });
    })();
  }, [slug, language]);

  return (
    <>
      <Seo
        title={`${frontmatter.title} - Amazed.DEV`}
        description={frontmatter.excerpt ?? ""}
        language={language}
        path={`/blog/${slug}`}
        alternates={alternates}
        image={`${SITE_URL}/images/posts/${frontmatter.cover_img}`}
        type="article"
      >
        <meta name="keywords" content={frontmatter.tags.join(",")} />
        <meta
          name="author"
          content={frontmatter.author || "Sebastian Luszczek"}
        />
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:modified_time" content={frontmatter.date} />
        <meta
          property="article:author"
          content={frontmatter.author || "Sebastian Luszczek"}
        />
        {frontmatter.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: frontmatter.title,
              description: frontmatter.excerpt,
              image: `${SITE_URL}/images/posts/${frontmatter.cover_img}`,
              author: {
                "@type": "Person",
                name: frontmatter.author || "Sebastian Luszczek",
              },
              publisher: {
                "@type": "Organization",
                name: "Amazed.DEV",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/images/profile.webp`,
                },
              },
              datePublished: frontmatter.date,
              dateModified: frontmatter.date,
              inLanguage: language,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/${language}/blog/${slug}`,
              },
              keywords: frontmatter.tags.join(", "),
            }),
          }}
        />
      </Seo>
      <div className="post">
        <div className="post-baner">
          <img
            src={`/images/posts/${frontmatter.cover_img}`}
            alt={frontmatter.title}
            width={700}
            height={500}
          />
          <div className="post-info">
            <h1 className="post-title">{frontmatter.title}</h1>
            <div className="card-meta">
              <div className="date">{frontmatter.date}</div>
            </div>
            <div className="tags">
              {frontmatter.tags &&
                frontmatter.tags.map((tag, index) => (
                  <Link
                    href={localePath(language, `/blog/tag/${slugify(tag)}`)}
                    key={index}
                  >
                    <div className="tag-btn">#{slugify(tag)}</div>
                  </Link>
                ))}
            </div>
            <ShareButtons
              link={`${SITE_URL}/${language}/blog/${slug}`}
              title={frontmatter.title}
            />
          </div>
        </div>
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: parsed }}></div>
        </div>
        {/* <ScrollButton /> */}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Unpublished posts are not rendered at all - they used to stay reachable
  // by direct URL even though nothing linked to them.
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug, lang: post.lang },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug, lang },
}: GetStaticPropsParams) {
  const markdowWithMeta = fs.readFileSync(
    path.join("posts", lang, `${slug}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdowWithMeta);
  const processedContent = await unified()
    .use(remarkParse)
    .use(codeTitle)
    .use(copyCode)
    .use(html, { sanitize: false })
    .use(prism)
    .process(content);
  const parsed = processedContent.toString();
  return {
    props: {
      ...getI18nProps(lang, postAlternates(slug)),
      slug,
      frontmatter,
      parsed,
    },
  };
}
