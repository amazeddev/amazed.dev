import { structText } from "../utils/text";

export default function BlogHero({ translations }) {
  return (
    <>
      <h1 className="post-title">Blog</h1>
      <>{structText(translations.blog.paragraph)}</>
    </>
  );
}
