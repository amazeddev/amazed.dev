import { structText } from "../utils/text";
import { Translation } from "../types";

interface BlogHeroProps {
  translations: Translation;
}

const BlogHero: React.FC<BlogHeroProps> = ({ translations }) => {
  return (
    <>
      <h1 className="post-title">Blog</h1>
      <>{structText(translations.blog.paragraph)}</>
    </>
  );
};

export default BlogHero;
