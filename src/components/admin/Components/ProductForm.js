import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductForm.module.css";
import axios from "axios";
import { useAlert } from "react-alert";
import UserContext from "../../context/UserContext";

function ProductForm() {
  const {  categories,
    brands, } =
    useContext(UserContext);
  const alert = useAlert();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    brand: "",
    category: "",
    highlight1: "",
    highlight2: "",
    highlight3: "",
    highlight4: "",
    sizes: [],
    colors: [],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3005/products/${id}`
          );
          const data = response.data.product[0];
          if (data) {
            setFormData({
              title: data.title,
              description: data.description,
              price: data.price,
              discountPercentage: data.discountPercentage,
              stock: data.stock,
              thumbnail: data.thumbnail,
              image1: data.images?.[0] || "",
              image2: data.images?.[1] || "",
              image3: data.images?.[2] || "",
              brand: data.brand,
              category: data.category,
              highlight1: data.highlights?.[0] || "",
              highlight2: data.highlights?.[1] || "",
              highlight3: data.highlights?.[2] || "",
              highlight4: data.highlights?.[3] || "",
              sizes: Array.isArray(data.sizes) ? data.sizes : [],
              colors: Array.isArray(data.colors) ? data.colors : [],
            });
          }
        } catch (error) {
          console.log("Product not found", error);
        }
      }
    };

    fetchProductData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newValues = checked
        ? [...prevState[field], value]
        : prevState[field].filter((v) => v !== value);
      return { ...prevState, [field]: newValues };
    });
  };

//   https://cdn.dummyjson.com/product-images/1/thumbnail.jpg
// https://cdn.dummyjson.com/product-images/1/1.jpg
// https://cdn.dummyjson.com/product-images/1/2.jpg
// https://cdn.dummyjson.com/product-images/1/3.jpg

const handleSubmit = async (e) => {
  e.preventDefault();

  const product = { ...formData };
  console.log('formData', product);
  product.highlights = [
    product.highlight1,
    product.highlight2,
    product.highlight3,
    product.highlight4,
  ];
  product.images = [
    product.image1,
    product.image2,
    product.image3,
    product.thumbnail,
  ];

  try {
    const response = await axios({
      method: id ? "patch" : "post",
      url: `http://localhost:3005/products/${id || ""}`,
      data: product,
    });

    if (response.status === 200 || response.status === 201) {
      if (id) {
        alert.success("Product updated successfully");
        console.log("Product updated successfully!");
      } else {
        alert.success("Product added successfully");
        console.log("Product added successfully!");
      }
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
      alert.error(`Failed to update product: ${error.response.data.message || error.message}`);
    } else if (error.request) {
      // Request was made but no response received
      console.log("Error request data:", error.request);
      alert.error("No response received from server");
    } else {
      // Something else happened
      console.log("Error message:", error.message);
      alert.error(`Failed to update product: ${error.message}`);
    }
    console.log("Error updating product:", error);
  }
};



  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {id ? "Edit Product" : "Add Product"}
        </h2>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Product Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles.input}
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className={styles.textarea}
            value={formData.description}
            onChange={handleInputChange}
          />
          <p className={styles.checkboxDescription}>
            Write a few sentences about products.
          </p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="brand" className={styles.label}>
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            className={styles.select}
            value={formData.brand}
            onChange={handleInputChange}
          >
            <option value="">--choose brand--</option>
            {/* Map through available brands */}
            {brands.map((br, index) => (
              <option value={br.brand}>{br.brand}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="colors" className={styles.label}>
            Colors
          </label>
          <div>
            {/* Map through available colors */}
            {/* Replace colors array with actual data */}
            {["Red", "Green", "Blue"].map((color) => (
              <div key={color} className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  name="colors"
                  value={color}
                  checked={formData.colors.includes(color)}
                  onChange={(e) => handleCheckboxChange(e, "colors")}
                />
                {color}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="sizes" className={styles.label}>
            Sizes
          </label>
          <div>
            {/* Map through available sizes */}
            {/* Replace sizes array with actual data */}
            {["S", "M", "L", "XL"].map((size) => (
              <div key={size} className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={(e) => handleCheckboxChange(e, "sizes")}
                />
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select
            name="category"
            className={styles.select}
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">--choose category--</option>
            {/* Map through available categories */}
            {categories.map((cate, index) => (
              <option value={cate.category}>{cate.category}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className={styles.input}
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="discountPercentage" className={styles.label}>
            Discount Percentage
          </label>
          <input
            type="number"
            name="discountPercentage"
            id="discountPercentage"
            className={styles.input}
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="stock" className={styles.label}>
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            className={styles.input}
            value={formData.stock}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="thumbnail" className={styles.label}>
            Thumbnail
          </label>
          <input
            type="text"
            name="thumbnail"
            id="thumbnail"
            className={styles.input}
            value={formData.thumbnail}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="image1" className={styles.label}>
            Image1
          </label>
          <input
            type="text"
            name="image1"
            id="image1"
            className={styles.input}
            value={formData.image1}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="image2" className={styles.label}>
            Image2
          </label>
          <input
            type="text"
            name="image2"
            id="image2"
            className={styles.input}
            value={formData.image2}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="image3" className={styles.label}>
            Image3
          </label>
          <input
            type="text"
            name="image3"
            id="image3"
            className={styles.input}
            value={formData.image3}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="highlight1" className={styles.label}>
            Highlight 1
          </label>
          <input
            type="text"
            name="highlight1"
            id="highlight1"
            className={styles.input}
            value={formData.highlight1}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="highlight2" className={styles.label}>
            Highlight 2
          </label>
          <input
            type="text"
            name="highlight2"
            id="highlight2"
            className={styles.input}
            value={formData.highlight2}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="highlight3" className={styles.label}>
            Highlight 3
          </label>
          <input
            type="text"
            name="highlight3"
            id="highlight3"
            className={styles.input}
            value={formData.highlight3}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="highlight4" className={styles.label}>
            Highlight 4
          </label>
          <input
            type="text"
            name="highlight4"
            id="highlight4"
            className={styles.input}
            value={formData.highlight4}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Link to="/admin">
          <button
            type="button"
            className={`${styles.button} ${styles.buttonCancel}`}
          >
            Cancel
          </button>
          </Link>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
