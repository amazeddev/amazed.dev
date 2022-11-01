import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { unified } from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import prism from "remark-prism";
import { codeTitle, copyCode } from "../../utils/code-blocks";
import Link from "next/link";
import { slugify } from "../../utils/posts";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabase";

import PageViews from "../../components/PageViews";
import Image from "next/image";

export default function PostPage({ frontmatter, parsed, slug }) {
  const [views, setViews] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabaseClient.rpc("increment_view", {
        page_slug: slug,
      });
      setViews(data);
      // use a class selector if available
      let blocks = document.querySelectorAll(".remark-highlight");

      blocks.forEach((block) => {
        // only add button if browser supports Clipboard API
        if (navigator.clipboard && block) {
          let button = document.createElement("button");

          // button.innerText = "";
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H48C21.5 64 0 85.5 0 112V464c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H282.5C269.4 26.7 233.8 0 192 0zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm-80 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>`;
          button.className = "copy-btn";
          block.insertBefore(button, block.children[0]);

          button.addEventListener("click", async () => {
            await copyCode(block);
          });
        }
      });
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Amazed.DEV - {frontmatter.title}</title>
        <meta
          name="description"
          hid="description"
          content={frontmatter.excerpt}
        />
        <meta name="keywords" content={frontmatter.tags.join(",")} />
        <meta
          hid="og:image"
          property="og:image"
          key="og:image"
          content={`https://amazed.dev/images/posts/${frontmatter.cover_image}`}
        />
        <meta
          hid="og:title"
          property="og:title"
          key="og:title"
          content={`${frontmatter.title} - Amazed.DEV`}
        />
        <meta
          hid="og:url"
          property="og:url"
          key="og:url"
          content={`https://amazed.dev/blog/${slug}`}
        />
        <meta
          hid="og:description"
          property="og:description"
          key="og:description"
          content={frontmatter.excerpt}
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
              <PageViews views={views} />
            </div>
            <div className="tags">
              {frontmatter.tags &&
                frontmatter.tags.map((tag, index) => (
                  <Link href={`/tag/${slugify(tag)}`} key={index}>
                    <div className="tag-btn">#{slugify(tag)}</div>
                  </Link>
                ))}
            </div>
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
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const markdowWithMeta = fs.readFileSync(
    path.join("posts", `${slug}.md`),
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
    },
  };
}
