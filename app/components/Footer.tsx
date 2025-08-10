import Link from "next/link";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="socials">
          <Link href="https://github.com/amazeddev" legacyBehavior={true}>
            <a target="_blank" rel="Github profile" aria-label="Github profile">
              <FontAwesomeIcon icon={faGithubSquare as any} />
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
              <FontAwesomeIcon icon={faLinkedin as any} />
            </a>
          </Link>
          <Link href="mailto:luszczeksebastian@gmail.com" legacyBehavior={true}>
            <a
              target="_blank"
              rel="Email address luszczeksebastian@gmail.com"
              aria-label="Email address luszczeksebastian@gmail.com"
            >
              <FontAwesomeIcon icon={faEnvelopeSquare as any} />
            </a>
          </Link>
        </div>
        <div className="info">
          <Link href="/" legacyBehavior={true}>
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
