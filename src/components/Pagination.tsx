interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
} 

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-2" aria-label="Pagination">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-white text-primary-600 border border-gray-200 hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Página anterior"
        >
          «
        </button>

        <span className="px-3 py-2 text-gray-700">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-white text-primary-600 border border-gray-200 hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Página siguiente"
        >
          »
        </button>
      </nav>
    </div>
  );
};

export default Pagination; 