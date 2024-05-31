import React, { useState } from "react";
import axios from "axios";
import styles from "./AddCategoryBrand.module.css"; // Import the CSS module
import Navbar from "../../navbar/Navbar";

const AddCategoryBrand = () => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const [brandMessage, setBrandMessage] = useState("");

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/category", { category });
      setCategoryMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setCategoryMessage(error.response.data.message);
      } else {
        setCategoryMessage("An error occurred");
      }
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/brand", { brand });
      setBrandMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setBrandMessage(error.response.data.message);
      } else {
        setBrandMessage("An error occurred");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h2>Add Category</h2>
      <form className={styles.form} onSubmit={handleCategorySubmit}>
        <input
          className={styles.input}
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          required
        />
        <button className={styles.button} type="submit">Add Category</button>
      </form>
      {categoryMessage && <p className={styles.message}>{categoryMessage}</p>}

      <h2>Add Brand</h2>
      <form className={styles.form} onSubmit={handleBrandSubmit}>
        <input
          className={styles.input}
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
          required
        />
        <button className={styles.button} type="submit">Add Brand</button>
      </form>
      {brandMessage && <p className={styles.message}>{brandMessage}</p>}
    </div></>
  );
};

export default AddCategoryBrand;
