import Link from "next/link";
import { localePath } from "../utils/i18n";
import { slugify } from "../utils/posts";
import { PostItemProps } from "../types";

// The post link wraps only the hero (image + title); tag links live in the
// card content, so anchors are never nested.
const PostItem: React.FC<PostItemProps & { extended?: boolean }> = ({
  post,
  language,
  extended = true,
}) => (
  <article className="card">
    <Link
      href={localePath(language, `/blog/${post.slug}`)}
      className="card-link"
    >
      <div className="card-hero">
        <img
          src={`/images/posts/${post.frontmatter.cover_img}`}
          alt=""
          width={600}
          height={400}
        />
        <div className="card-hero-overlay">
          <h2>{post.frontmatter.title}</h2>
        </div>
      </div>
    </Link>
    <div className="card-content">
      <div className="card-meta">
        <div className="card-date">{post.frontmatter.date}</div>
      </div>
      <div className="tags">
        {post.frontmatter.tags &&
          post.frontmatter.tags.map((tag) => (
            <Link
              href={localePath(language, `/blog/tag/${slugify(tag)}`)}
              key={tag}
              className="tag-btn"
            >
              #{slugify(tag)}
            </Link>
          ))}
      </div>
      {extended && <p>{post.frontmatter.excerpt}</p>}
    </div>
  </article>
);

export default PostItem;
