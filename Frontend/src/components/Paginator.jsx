import React from "react";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center gap-1 mt-4 sm:justify-start ">
      <button
        onClick={() => onPageChange(1)}
        className="mx-1 px-3 rounded border-2 border-primary text-primary font-extrabold">
        {"<<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? "bg-primary text-white" : "bg-gray-300"
          }`}>
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(totalPages)}
        className="mx-1 px-3 rounded border-2 border-black text-black font-extrabold">
        {">>"}
      </button>
    </div>
  );
};

export default Paginator;
