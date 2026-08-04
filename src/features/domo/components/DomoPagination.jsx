import "./styles/pagination.css";

const DomoPagination = ({ pageCount, onPageChange, currentPage }) => {
  if (!pageCount || pageCount < 2) {
    return null;
  }

  const goToPage = (selected) => {
    if (selected < 0 || selected >= pageCount) {
      return;
    }

    onPageChange?.({ selected });
  };

  const renderPageButtons = () => {
    const pages = Array.from({ length: pageCount }, (_, index) => index);

    return pages.map((pageIndex) => (
      <li key={pageIndex} className={pageIndex === currentPage ? "active" : undefined}>
        <button type="button" onClick={() => goToPage(pageIndex)}>
          {pageIndex + 1}
        </button>
      </li>
    ));
  };

  return (
    <nav aria-label="페이지네이션">
      <ul className="pagination">
        <li className={currentPage === 0 ? "disabled" : undefined}>
          <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
            &lt;
          </button>
        </li>

        {renderPageButtons()}

        <li className={currentPage === pageCount - 1 ? "disabled" : undefined}>
          <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount - 1}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DomoPagination;
