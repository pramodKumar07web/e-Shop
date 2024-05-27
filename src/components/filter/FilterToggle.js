import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import FilterPage from "./FilterPage";
import styles from "./FilterToggle.module.css";
import style from "./FilterPage.module.css";
import ProductList from "../products/ProductList";
import Filter from "./Filter";
import Navbar from "../navbar/Navbar";

const FilterToggle = () => {
  const { filteredProducts } = useContext(UserContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
    <Navbar/>
      {/* <button className={styles.filterIcon} onClick={toggleFilter}>
        <i class="fa-solid fa-filter icon"></i>
      </button>
      <div className={style.container}>
        <div
          className={`${style.filterPage} ${
            isFilterVisible ? style.visible : ""
          }`}
        >
          <div className={style.header}>
            <button onClick={toggleFilter}>Close</button>
          </div>
          <div className={styles.content}>
            <h2>Filter Options</h2>
            <Filter />
          </div>
        </div>
      </div>
      <ProductList products={filteredProducts} /> */}
    </>
  );
};

export default FilterToggle;
