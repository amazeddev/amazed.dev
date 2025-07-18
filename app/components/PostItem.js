import Link from "next/link";
import Image from "next/image";
import { slugify } from "../utils/posts";

export default function PostItem({ post, language }) {
  return (
    <Link href={`/blog/${language}/${post.slug}`}>
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
          </div>
          <div className="tags">
            {post.frontmatter.tags &&
              post.frontmatter.tags.map((tag, index) => (
                <Link
                  href={`/blog/${language}/tag/${slugify(tag)}`}
                  key={index}
                >
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
