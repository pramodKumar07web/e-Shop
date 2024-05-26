import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import FilterPage from './FilterPage';
import styles from './FilterToggle.module.css';
import ProductList from '../products/ProductList';
import Navbar from '../navbar/Navbar';

const FilterToggle = () => {
  const { setFilters, filteredProducts } = useContext(UserContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
    {/* <Navbar/> */}
    <button className={styles.filterIcon} onClick={toggleFilter}>
        {/* <img src="path-to-filter-icon.png" alt="Filter" /> */}
        <i class="fa-solid fa-filter icon"></i>
      </button>
    <div className={styles.container}>
      
      <FilterPage
        isVisible={isFilterVisible}
        onClose={toggleFilter}
        onFilterChange={handleFilterChange}
      />
      <ProductList  products={filteredProducts} />
    </div></>
  );
};

export default FilterToggle;
