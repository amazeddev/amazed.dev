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
        <div className="socials">
          <Link href="https://github.com/amazeddev" legacyBehavior={true}>
            <a target="_blank" rel="Github profile" aria-label="Github profile">
              <FontAwesomeIcon icon={faGithubSquare} />
            </a>
          </Link>
          <Link
            href="https://twitter.com/AmazedDeveloper"
            legacyBehavior={true}
          >
            <a
              target="_blank"
              rel="twitter profile"
              aria-label="twitter profile"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
          </Link>
          <Link
            href="https://www.linkedin.com/in/luszczeksebastian/"
            legacyBehavior={true}
          >
            <a
              target="_blank"
              rel="LinkedIn profile"
              aria-label="LinkedIn profile"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Link>
        </div>
        <div className="info">
          <strong>amazed.dev</strong> Software © Copyright{" "}
          {new Date().getFullYear()}
        </div>
        <p>Powered by Next.js, TypeScript, Terraform & AWS</p>
      </div>
    </footer>
  );
}
