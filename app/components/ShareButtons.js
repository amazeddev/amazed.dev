import Link from "next/link";
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faLinkSimple } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ShareButtons = ({ link, title }) => {
  return (
    <div className="share-btns">
      <Link href={`http://www.facebook.com/share.php?u=${link}`}>
        <a
          target="_blank"
          rel="facebook share"
          aria-label="facebook share"
          title="share on facebook"
        >
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
      </Link>
      <Link href={`https://twitter.com/intent/tweet?text=${title}:%0A${link}`}>
        <a
          target="_blank"
          rel="twitter share"
          aria-label="twitter share"
          title="share on twitter"
        >
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      </Link>
      <Link
        href={`https://linkedin.com/shareArticle?url=${link}&title=${title}`}
      >
        <a
          target="_blank"
          rel="linkedin share"
          aria-label="linkedin share"
          title="share on linkedin"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </Link>
    </div>
  );
};
