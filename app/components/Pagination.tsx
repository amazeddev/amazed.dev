import React from "react";
import Link from "next/link";
import { PaginationProps, Language } from "../types";

interface ExtendedPaginationProps extends PaginationProps {
  language: Language;
}

const Pagination: React.FC<ExtendedPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  language,
}) => {
  const pageIntoArray = Array.from(Array(totalPages).keys());

  return pageIntoArray.length > 1 ? (
    <nav className="pagination">
      <ul className="page-items">
        {pageIntoArray.map((page) => {
          return (
            <Link
              href={page === 0 ? "/" : `/blog/${language}/pages/${page + 1}`}
              key={page}
            >
              <li
                className={
                  page + 1 === currentPage
                    ? "page-item current-page"
                    : "page-item"
                }
                onClick={() => onPageChange(page + 1)}
              >
                {page + 1}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  ) : null;
};

export default Pagination;
