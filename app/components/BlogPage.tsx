import Head from "next/head";
import PostItem from "../components/PostItem";
import React, { useMemo } from "react";
import { pageCount } from "../utils/posts";
import BlogHero from "./BlogHero";
import { BlogPageProps } from "../types";
import Pagination from "../components/Pagination";

const show_per_page = Number(process.env.SHOW_PER_PAGE) || 8;

const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  page,
  setPage,
  language,
  translations,
  extended = true,
}) => {
  // Memoize the filtered posts to prevent unnecessary re-renders
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.lang === language);
  }, [posts, language]);

  return (
    <div className="container-content">
      <Head>
        <title>Amazed.DEV - Blog</title>
      </Head>{" "}
      <BlogHero translations={translations} />
      <div className="cards">
        {filteredPosts
          .slice((page - 1) * show_per_page, show_per_page * page)
          .map((post, index) => (
            <PostItem
              post={post}
              key={index}
              language={language}
              extended={extended}
            />
          ))}
      </div>
      <Pagination
        totalPages={pageCount(posts.length)}
        currentPage={page}
        onPageChange={setPage}
        language={language}
      />
    </div>
  );
};

export default BlogPage;
