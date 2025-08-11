import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../utils/posts";
import { PostItemProps } from "../types";

const PostItem: React.FC<
  PostItemProps & { extended?: boolean; viewCount?: number }
> = ({ post, language, extended = true, viewCount = 0 }) => {
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
          <div className="card-hero-overlay">
            <h2>{post.frontmatter.title}</h2>
          </div>
        </div>
        <div className="card-content">
          <div className="card-meta">
            <div className="card-date">{post.frontmatter.date}</div>
            {viewCount > 0 && (
              <div className="view-count">
                <FontAwesomeIcon icon={faEye as any} />
                <span>{viewCount.toLocaleString()}</span>
              </div>
            )}
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
          {extended && <p>{post.frontmatter.excerpt}</p>}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
