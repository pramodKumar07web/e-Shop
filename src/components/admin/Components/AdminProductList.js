import React, { useContext, useState } from "react";
import FilterStyle from "../../products/ProductList.module.css";
import styles from "../../filter/FilterToggle.module.css";
import style from "../../filter/FilterPage.module.css";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Filter from "../../filter/Filter";
import Navbar from "../../navbar/Navbar";
import axios from "axios";
import { useAlert } from "react-alert";

const AdminProductList = () => {
  const alert = useAlert();
  const { products, filteredProducts } = useContext(UserContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  // {"title":"xyzssss"}
  const handleDelete = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3005/products/${id}`,
        {
          deleted: true,
        }
      );

      if (response.status === 200) {
        alert.success("Product deleted successfully");
        console.log("Product deleted successfully!");
      } else {
        alert.error("Failed to delete product");
        console.log("Failed to delete product:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
        alert.error(
          `Failed to delete product: ${
            error.response.data.message || error.message
          }`
        );
      } else if (error.request) {
        console.log("Error request data:", error.request);
        alert.error("No response received from server");
      } else {
        console.log("Error message:", error.message);
        alert.error(`Failed to delete product: ${error.message}`);
      }
      console.log("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <button className={styles.filterIcon} onClick={toggleFilter}>
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
      <div className={FilterStyle.card_mr}>
        <h2 className={FilterStyle.products}>Products</h2>

        <div className={FilterStyle.card_container}>
          <Link to="/admin/product-form" className={FilterStyle.addProductLink}>
            Add New Product
          </Link>
          {filteredProducts && filteredProducts ? (
            <div className={FilterStyle.card_list}>
              {filteredProducts.map((product) => (
                <div>
                  <Link
                    to={`/product-details/${product._id}`}
                    key={product._id}
                  >
                    <div className={FilterStyle.card}>
                      <img
                        className={FilterStyle.img}
                        src={product.thumbnail}
                        alt=""
                      />
                      <h3>{product.title}</h3>
                      {/* <p className={FilterStyle.p3}>Sony Camera</p> */}
                      <p className={`${FilterStyle.p} ${FilterStyle.p3}`}>
                        Price: $<strike>{product.price}</strike>
                      </p>
                      <p className={FilterStyle.p}>
                        Discount : {product.discountPercentage}%
                      </p>
                      <p className={FilterStyle.p}>
                        Special Price : $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className={FilterStyle.p}>Brand : {product.brand}</p>
                      <p className={FilterStyle.p}>
                        Category : {product.category}
                      </p>
                      <p className={FilterStyle.p}>Add on 5 minutes ago</p>

                      <div className={FilterStyle.stock_rating}>
                        <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                          Stock : {product.stock}
                        </p>
                        <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                          Rating : {product.rating}
                        </p>
                      </div>

                      <div className={FilterStyle.product}>
                        {product.deleted && (
                          <div>
                            <p className={FilterStyle.textRed}>
                              product deleted
                            </p>
                          </div>
                        )}
                        {product.stock <= 0 && (
                          <div>
                            <p className={FilterStyle.textRedLight}>
                              out of stock
                            </p>
                          </div>
                        )}
                      </div>
                      {/* <div className={FilterStyle.product}>
                        <p className={FilterStyle.view}>VIEW PRODUCT</p>
                        <p className={FilterStyle.cart}>ADD TO CART</p>
                      </div> */}
                    </div>
                  </Link>
                  <div className="mt-5">
                    <div className={FilterStyle.product}>
                      <Link
                        to={`/admin/product-form/edit/${product._id}`}
                        className={FilterStyle.view}
                      >
                        Edit Product
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        type="button"
                        className={FilterStyle.cart}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={FilterStyle.card_list}>
              {products && Array.isArray(products) ? (
                products.map((product) => (
                  <div>
                    <Link
                      to={`/product-details/${product._id}`}
                      key={product._id}
                    >
                      <div className={FilterStyle.card}>
                        <img
                          className={FilterStyle.img}
                          src={product.thumbnail}
                          alt=""
                        />
                        <h3>{product.title}</h3>
                        {/* <p className={FilterStyle.p3}>Sony Camera</p> */}
                        <p className={`${FilterStyle.p} ${FilterStyle.p3}`}>
                          Price: $<strike>{product.price}</strike>
                        </p>
                        <p className={FilterStyle.p}>
                          Discount : {product.discountPercentage}%
                        </p>
                        <p className={FilterStyle.p}>
                          Special Price : $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className={FilterStyle.p}>Brand : {product.brand}</p>
                        <p className={FilterStyle.p}>
                          Category : {product.category}
                        </p>
                        <p className={FilterStyle.p}>Add on 5 minutes ago</p>

                        <div className={FilterStyle.product}>
                          <p
                            className={`${FilterStyle.p} ${FilterStyle.stock}`}
                          >
                            Stock : {product.stock}
                          </p>
                          <p
                            className={`${FilterStyle.p} ${FilterStyle.stock}`}
                          >
                            Rating : {product.rating}
                          </p>
                        </div>

                        <div className={FilterStyle.product}>
                          <p className={FilterStyle.view}>VIEW PRODUCT</p>
                          <p className={FilterStyle.cart}>ADD TO CART</p>
                        </div>
                      </div>
                    </Link>
                    <div className="mt-5">
                      <Link
                        to={`/admin/product-form/edit/${product._id}`}
                        className="rounded-md my-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Product
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        type="button"
                        className={FilterStyle.remove}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
