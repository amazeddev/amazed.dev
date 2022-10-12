import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header>
      <div className="top-bar">
        <Link href="/">
          <h2 className="logo">Amazed.DEV</h2>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
