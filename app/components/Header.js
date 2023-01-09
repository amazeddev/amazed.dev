import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ setIsOpen }) {
  return (
    <header>
      <nav className="navbar">
        <Link href="/">
          <div className="logo">
            <h2>Amazed</h2>
            <h1>.DEV</h1>
          </div>
        </Link>
        <Link href="/">Blog</Link>
        <Link href="/about">O mnie</Link>
        <div onClick={() => setIsOpen(true)} className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </nav>
    </header>
  );
}
