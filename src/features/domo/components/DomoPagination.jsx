import ReactPaginate from "react-paginate";
import "./styles/pagination.css";
import "@/styles/domo.global.css";

const DomoPagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage}
    />
  );
};

export default DomoPagination;
