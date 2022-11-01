import fs from "fs";
import path from "path";

import Head from "next/head";
import matter from "gray-matter";

import PostItem from "../components/PostItem";
import { supabaseClient } from "../lib/supabase";
import { useEffect, useState } from "react";
import Pagnation from "../components/Pagination";
import { pageCount } from "../utils/posts";

const show_per_page = process.env.SHOW_PER_PAGE;

export default function Home({ posts, totalPageCount }) {
  const [views, setViews] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabaseClient
        .from("pages")
        .select("slug, view_count");
      setViews(data);
    })();
  }, []);
  return (
    <div>
      <Head>
        <title>Amazed.DEV - Blog</title>
      </Head>
      <h1 className="post-title">Hello</h1>
      <p>
        Ille fida formosus, et addunt viscera perdidit ad pondere quia tellus
        consequitur et quoque scinditque in. Ratis laborum instabat quaedam
        partem Phoebus, manus _partibus poenas_. Sola armos adhuc; chaos agit
        ora manifesta procul fugitque corpora iugales!
      </p>
      <div className="cards">
        {posts.map((post, index) => (
          <PostItem
            post={post}
            view_count={views?.find((c) => c.slug === post.slug)?.view_count}
            key={index}
          />
        ))}
      </div>
      <Pagnation totalPageCount={totalPageCount} currentPage={1} />
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdowWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts: posts
        .filter((post) => post.frontmatter.published)
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        )
        .slice(0, show_per_page),
      totalPageCount: pageCount(posts.length),
    },
  };
}
