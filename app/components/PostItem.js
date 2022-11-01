import Link from "next/link";
import Image from "next/image";
import { slugify } from "../utils/posts";
import PageViews from "./PageViews";

export default function PostItem({ post, view_count }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="card">
        <div className="card-hero">
          <Image
            src={`/images/posts/${post.frontmatter.cover_img}`}
            alt=""
            width={600}
            height={400}
          />
          <h2>{post.frontmatter.title}</h2>
        </div>
        <div className="card-content">
          <div className="card-meta">
            <div className="card-date">{post.frontmatter.date}</div>
            <PageViews views={view_count} />
          </div>
          <div className="tags">
            {post.frontmatter.tags &&
              post.frontmatter.tags.map((tag, index) => (
                <Link href={`/tag/${slugify(tag)}`} key={index}>
                  <div className="tag-btn">#{slugify(tag)}</div>
                </Link>
              ))}
          </div>
          <p>{post.frontmatter.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
