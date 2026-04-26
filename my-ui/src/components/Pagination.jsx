function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
      return null;
    }
  
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);
  
    return (
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          style={{ marginRight: "10px" }}
        >
          Prev
        </button>
  
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            style={{
              marginRight: "5px",
              fontWeight: currentPage === pageNumber ? "bold" : "normal",
            }}
          >
            {pageNumber + 1}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    );
  }
  
  export default Pagination;