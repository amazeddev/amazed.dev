import Link from "next/link";
import Image from "next/image";
import { slugify } from "../utils/posts";

export default function PostItem({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="card card-btn">
        <img src={post.frontmatter.cover_image} alt="" />
        <h2>{post.frontmatter.title}</h2>
        <div className="post-date">{post.frontmatter.date}</div>
        <div className="tags">
          {post.frontmatter.tags &&
            post.frontmatter.tags.map((tag, index) => (
              <Link href={`/tag/${slugify(tag)}`} key={index}>
                <div className="tag-btn">{slugify(tag)}</div>
              </Link>
            ))}
        </div>
        <p>{post.frontmatter.excerpt}</p>
      </div>
    </Link>
  );
}
