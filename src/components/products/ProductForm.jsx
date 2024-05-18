// ProductForm.js
import React, { useState } from "react";
import styles from "./ProductForm.module.css"; // Import the CSS module
import axios from "axios";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "electronics",
    productImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value,});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      //ApI Call
      const response = await axios.post("http://localhost:3005/api/products",product);
      console.log(response.data);
      if (response && response.data) {
        console.log(response.data)
       
       // Navigate('/Signin');
      } else {
        console.error("Invalid Response Data");
      }
    } catch (error) {
      console.error("error during product not save ", error);
      if (error.response && error.response.data) {
        console.error("Error details ", error.response.data);
      } else {
        console.log("Unexpected Error");
      }
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className={styles["product-form"]}>
      <label htmlFor="productName" className={styles.label}>
        Product Name:
      </label>
      <input
        type="text"
        id="productName"
        name="productName"
        value={product.productName}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label htmlFor="productDescription" className={styles.label}>
        Product Description:
      </label>
      <textarea
        id="productDescription"
        name="productDescription"
        value={product.productDescription}
        onChange={handleChange}
        rows="4"
        className={styles.input}
        required
      ></textarea>

      <label htmlFor="productPrice" className={styles.label}>
        Product Price:
      </label>
      <input
        type="number"
        id="productPrice"
        name="productPrice"
        value={product.productPrice}
        onChange={handleChange}
        step="0.01"
        className={styles.input}
        required
      />

      <label htmlFor="productCategory" className={styles.label}>
        Product Category:
      </label>
      <select
        id="productCategory"
        name="productCategory"
        value={product.productCategory}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="home_appliances">Home Appliances</option>
        {/* Add more categories as needed */}
      </select>

      <label htmlFor="productImage" className={styles.label}>
        Product Image URL:
      </label>
      <input
        type="url"
        id="productImage"
        name="productImage"
        value={product.productImage}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <button type="submit" className={styles.button}>
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
