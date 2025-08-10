import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { unified } from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import prism from "remark-prism";
import { codeTitle, copyCode } from "../../../utils/code-blocks";
import Link from "next/link";
import { slugify } from "../../../utils/posts";
import React, { useEffect } from "react";
import Image from "next/image";
import { ShareButtons } from "../../../components/ShareButtons";
import {
  PostPageProps,
  GetStaticPropsParams,
  GetStaticPathsParams,
} from "../../../types";

export default function PostPage({
  frontmatter,
  parsed,
  slug,
  language,
}: PostPageProps) {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <Head>
        <title>Amazed.DEV - {frontmatter.title}</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta name="keywords" content={frontmatter.tags.join(",")} />
        <meta
          property="og:image"
          key="og:image"
          content={`https://amazed.dev/images/posts/${frontmatter.cover_img}`}
        />
        <meta
          property="og:title"
          key="og:title"
          content={`${frontmatter.title} - Amazed.DEV`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          key="og:url"
          content={`https://amazed.dev/blog/${slug}`}
        />
        <meta
          property="og:description"
          key="og:description"
          content={frontmatter.excerpt}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AmazedDeveloper" />
        <meta
          name="twitter:creator"
          key="twitter:creator"
          content="@AmazedDeveloper"
        />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.excerpt} />
        <meta
          name="twitter:image"
          content={`https://amazed.dev/images/posts/${frontmatter.cover_img}`}
        />
      </Head>
      <div className="post">
        <div className="post-baner">
          <Image
            src={`/images/posts/${frontmatter.cover_img}`}
            alt=""
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
                    href={`/blog/${language}/tag/${slugify(tag)}`}
                    key={index}
                  >
                    <div className="tag-btn">#{slugify(tag)}</div>
                  </Link>
                ))}
            </div>
            <ShareButtons
              link={`https://amazed.dev/blog/${slug}`}
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
  const enFiles = fs.readdirSync(path.join("posts", "en"));
  const plFiles = fs.readdirSync(path.join("posts", "pl"));
  const enPaths = enFiles.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
      lang: "en",
    },
  }));
  const plPaths = plFiles.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
      lang: "pl",
    },
  }));

  return {
    paths: [...enPaths, ...plPaths],
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
      slug,
      frontmatter,
      parsed,
      language: lang,
    },
  };
}
