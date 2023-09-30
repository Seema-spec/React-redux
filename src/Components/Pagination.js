
import React from 'react';
import styles from '../Components/Common.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'activePage' : 'pageButton'}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_count}>
        Page {currentPage} of {totalPages} :
      </div>
      <div className={styles.pagination_buttons}>{renderPagination()}</div>
    </div>
  );
};

export default Pagination;
