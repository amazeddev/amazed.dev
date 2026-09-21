import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Language } from "../types";
import { localePath } from "../utils/i18n";

const Footer: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="socials">
          <a
            href="https://github.com/amazeddev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github profile"
          >
            <FontAwesomeIcon icon={faGithubSquare as any} />
          </a>
          <a
            href="https://www.linkedin.com/in/luszczeksebastian/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedin as any} />
          </a>
          <a
            href="mailto:luszczeksebastian@gmail.com"
            aria-label="Email address luszczeksebastian@gmail.com"
          >
            <FontAwesomeIcon icon={faEnvelopeSquare as any} />
          </a>
        </div>
        <div className="info">
          <Link href={localePath(language)}>
            <strong>amazed.dev</strong>
          </Link>{" "}
          Software © Copyright {new Date().getFullYear()}
        </div>
        <p>Powered by Next.js, TypeScript, Terraform & AWS</p>
      </div>
    </footer>
  );
};

export default Footer;
