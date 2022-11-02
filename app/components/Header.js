import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ setIsOpen }) {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <h2>Amazed.DEV</h2>
          </Link>
        </div>
        <Link href="/">Blog</Link>
        <Link href="/about">O mnie</Link>
        <div onClick={() => setIsOpen(true)} className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </nav>
    </header>
  );
}
