import React from "react";

function buildPages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPages(page, totalPages);

  return (
    <div className="pagination">
      <button
        className="btn btn-ghost"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Previous
      </button>

      <div className="pagination-pages">
        {pages.map((entry, index) =>
          entry === "..." ? (
            <span key={`ellipsis-${index}`} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={entry}
              className={`page-btn${entry === page ? " is-active" : ""}`}
              onClick={() => onPageChange(entry)}
              type="button"
            >
              {entry}
            </button>
          )
        )}
      </div>

      <button
        className="btn btn-ghost"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
