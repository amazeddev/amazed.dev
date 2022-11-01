import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import PostItem from "../../components/PostItem";
import { slugify } from "../../utils/posts";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TagPage({ posts, tag }) {
  return (
    <div>
      <Head>
        <title>Amazed.DEV - #{tag}</title>
      </Head>
      <h1 className="post-title">
        #{tag}
        {"\t"}
        <FontAwesomeIcon icon={faTags} />
      </h1>

      <div className="cards">
        {posts.map((post, index) => (
          <PostItem post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  let tags = [];
  const paths = files.map((filename) => {
    const markdowWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(markdowWithMeta);
    if (frontmatter.tags) {
      tags = [...tags, ...frontmatter.tags.map((tag) => slugify(tag))];
    }
    return null;
  });

  console.log(Array.from(new Set(tags.filter((tag) => tag))));

  return {
    paths: Array.from(new Set(tags.filter((tag) => tag))).map((tag) => ({
      params: { tag },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag } }) {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdowWithMeta);
    const tags = frontmatter.tags
      ? frontmatter.tags.map((tag) => slugify(tag))
      : undefined;
    if (tags && tags.includes(tag)) {
      return {
        slug,
        frontmatter: {
          ...frontmatter,
          tags,
        },
      };
    }
    return null;
  });

  return {
    props: {
      posts: posts
        .filter((post) => post)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        ),
      tag,
    },
  };
}
