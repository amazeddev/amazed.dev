import React from "react";
import Link from "next/link";
import { PaginationProps } from "../types";
import { localePath } from "../utils/i18n";

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  language,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Blog pagination">
      <ul className="page-items">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item current-page" : "page-item"
              }
            >
              <Link
                href={
                  page === 1
                    ? localePath(language, "/blog")
                    : localePath(language, `/blog/pages/${page}`)
                }
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
