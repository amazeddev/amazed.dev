import fs from "fs";
import path from "path";

import Head from "next/head";
import matter from "gray-matter";

import PostItem from "../components/PostItem";
import { supabaseClient } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
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
      <div className="posts">
        {posts.map((post, index) => (
          <PostItem
            post={post}
            view_count={views?.find((c) => c.slug === post.slug)?.view_count}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const index = {};
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdowWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdowWithMeta);

    return { slug, frontmatter };
  });

  function add(str, id) {
    if (!index[str]) {
      index[str] = [id];
    } else {
      index[str].push(id);
    }
  }

  posts.forEach((post, index) => {
    const {
      frontmatter: { title, excerpt },
    } = post;
    title.split(" ").forEach((word) => {
      add(word, index + 1);
    });
    excerpt.split(" ").forEach((word) => {
      add(word, index + 1);
    });
  });

  // fs.writeFileSync("index.json", JSON.stringify(index));

  return {
    props: {
      posts: posts.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      ),
    },
  };
}
