import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import styles from './FilterPage.module.css';
import Filter from './Filter';

const FilterPage = ({ isVisible, onClose }) => {
  const { filters, setFilters } = useContext(UserContext);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  return (
    <>
   
    <div className={`${styles.filterPage} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={styles.content}>
        <h2>Filter Options</h2>
        <Filter/>
      </div>
    </div>
    </>
  );
};

export default FilterPage;
