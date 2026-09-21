import PostItem from "./PostItem";
import BlogHero from "./BlogHero";
import Pagination from "./Pagination";
import { BlogPageProps } from "../types";

const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  page,
  totalPages,
  language,
  translations,
}) => (
  <div className="container-content">
    <BlogHero translations={translations} />
    <div className="cards">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} language={language} />
      ))}
    </div>
    <Pagination totalPages={totalPages} currentPage={page} language={language} />
  </div>
);

export default BlogPage;
