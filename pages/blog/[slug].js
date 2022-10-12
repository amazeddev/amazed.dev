import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import { unified } from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import prism from "remark-prism";
import { codeTitle, copyCode } from "../../utils/code-blocks";
import ScrollButton from "../../components/ScrollBtn";
import Link from "next/link";
import { slugify } from "../../utils/posts";

export default function PostPage({ frontmatter, parsed }) {
  return (
    <>
      <Head>
        <title>Amazed.DEV - {frontmatter.title}</title>
      </Head>
      <div className="card card-page">
        <div className="post-baner">
          <img src={frontmatter.cover_image} alt="" />
          <div className="post-meta">
            <h1 className="post-title">{frontmatter.title}</h1>
            <div className="post-date">{frontmatter.date}</div>
            <div className="tags">
              {frontmatter.tags &&
                frontmatter.tags.map((tag, index) => (
                  <Link href={`/tag/${slugify(tag)}`} key={index}>
                    <div className="tag-btn">{slugify(tag)}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: parsed }}></div>
        </div>
      </div>
      <ScrollButton />
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
