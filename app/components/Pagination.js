import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Pagnation({ totalPageCount, currentPage }) {
  let router = useRouter();

  let pageIntoArray = Array.from(Array(totalPageCount).keys());

  return pageIntoArray.length > 1 ? (
    <nav className="pagination">
      <ul className="page-items">
        {pageIntoArray.map((page) => {
          return (
            <Link
              href={page === 0 ? "/" : `/blog/pages/${page + 1}`}
              key={page}
            >
              <li
                className={
                  page + 1 == currentPage
                    ? "page-item current-page"
                    : "page-item"
                }
              >
                {page + 1}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  ) : (
    ""
  );
}

export default Pagnation;
