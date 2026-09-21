import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShareButtonsProps {
  link: string;
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ link, title }) => {
  const url = encodeURIComponent(link);
  const text = encodeURIComponent(title);

  return (
    <div className="share-btns">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="facebook share"
        title="share on facebook"
      >
        <FontAwesomeIcon icon={faFacebookSquare as any} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="twitter share"
        title="share on twitter"
      >
        <FontAwesomeIcon icon={faTwitterSquare as any} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="linkedin share"
        title="share on linkedin"
      >
        <FontAwesomeIcon icon={faLinkedin as any} />
      </a>
    </div>
  );
};
