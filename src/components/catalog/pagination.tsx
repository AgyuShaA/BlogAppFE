import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  tp: (key: string) => string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
  tp,
}) => {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);

    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);

    if (start > 2) {
      pageNumbers.push("...");
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex  justify-center items-center gap-1 sm:gap-2 mt-6 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 gap-2 flex py-[2px] sm:py-1 sm:px-3 text-md border rounded disabled:opacity-50"
      >
        ← <p className="hidden sm:flex">{tp("prev")}</p>
      </button>

      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span
            key={`dots-${idx}`}
            className="px-2 py-[2px] sm:py-1 sm:px-3 text-md select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`px-2 py-[2px] rounded-lg text-md sm:py-1 sm:px-3 ${
              currentPage === page
                ? "border-2 border-black text-black"
                : "bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex  gap-2 px-2 py-[2px] text-md border sm:py-1 sm:px-3 rounded disabled:opacity-50"
      >
        <p className="hidden sm:flex">{tp("next")} </p>→
      </button>
    </div>
  );
};
