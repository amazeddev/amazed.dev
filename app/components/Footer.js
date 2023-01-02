import Link from "next/link";

import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="info">
          {new Date().getFullYear()} © <strong>AmazedDev</strong> Software
        </div>
        <div className="socials">
          <Link href="https://github.com/amazeddev">
            <a target="_blank" rel="Github profile" aria-label="Github profile">
              <FontAwesomeIcon icon={faGithubSquare} />
            </a>
          </Link>
          <Link href="https://twitter.com/AmazedDeveloper">
            <a
              target="_blank"
              rel="twitter profile"
              aria-label="twitter profile"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/luszczeksebastian/">
            <a
              target="_blank"
              rel="LinkedIn profile"
              aria-label="LinkedIn profile"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
