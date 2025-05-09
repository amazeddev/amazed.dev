import Head from "next/head";

import PostItem from "../components/PostItem";
import React from "react";
import BlogHero from "../components/BlogHero";
import Pagnation from "../components/Pagination";
import { pageCount } from "../utils/posts";

const show_per_page = process.env.SHOW_PER_PAGE || 8;

export default function BlogPage({
  posts,
  page,
  setPage,
  translations,
  language,
}) {
  return (
    <div className="container-content">
      <Head>
        <title>Amazed.DEV - Blog</title>
      </Head>{" "}
      <BlogHero translations={translations} />
      <div className="cards">
        {posts
          .slice((page - 1) * show_per_page, show_per_page * page)
          .map((post, index) => (
            <PostItem post={post} key={index} language={language} />
          ))}
      </div>
      <Pagnation
        totalPageCount={pageCount(posts.length)}
        currentPage={page}
        setPage={setPage}
        language={language}
      />
    </div>
  );
}
