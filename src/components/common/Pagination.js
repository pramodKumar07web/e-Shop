import React, { useContext } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './Pagination.module.css';
import UserContext from '../context/UserContext';
// import { ITEMS_PER_PAGE } from '../../app/constants';

export function Pagination({ page, setPage, handlePage, }) {
    const {totalProducts, setTotalProducts} = useContext(UserContext)
    const ITEMS_PER_PAGE = 10
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  // console.log('totalProducts',totalProducts)
  
  return (
    <div className={`${styles.paginationContainer} sm:px-6`}>
      <div className={`${styles.paginationContainerSmHidden} sm:hidden`}>
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className={styles.paginationButton}
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className={`${styles.paginationButton} ml-3`}
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className={styles.paginationInfo}>
            Showing{' '}
            <span>
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span>
              {page * ITEMS_PER_PAGE > totalProducts ? totalProducts : page * ITEMS_PER_PAGE}
            </span>{' '}
            of <span>{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className={styles.paginationNav}
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className={`${styles.paginationNavButton} ${styles.paginationNavButtonFirst}`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className={styles.paginationIcon} aria-hidden="true" />
            </div>

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                // key={index + 1}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`${styles.paginationNavButton} ${
                  index + 1 === page ? styles.paginationNavButtonActive : ''
                }`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className={`${styles.paginationNavButton} ${styles.paginationNavButtonLast}`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={styles.paginationIcon} aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
