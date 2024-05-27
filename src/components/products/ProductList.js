import React, { useContext, useState } from "react";
import FilterStyle from "./ProductList.module.css";
import styles from "../filter/FilterToggle.module.css";
import style from "../filter/FilterPage.module.css";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import Filter from "../filter/Filter";

const ProductList = () => {
  const { products, filteredProducts } = useContext(UserContext);
  // console.log('filteredProductsList',filteredProducts)
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <>
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
        {filteredProducts && filteredProducts ? (
          <div className={FilterStyle.card_list}>
            {filteredProducts.map((product) => (
              <Link to={`/product-details/${product._id}`} key={product._id}>
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
                  <p className={FilterStyle.p}>Category : {product.category}</p>
                  <p className={FilterStyle.p}>Add on 5 minutes ago</p>

                  <div className={FilterStyle.product}>
                    <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                      Stock : {product.stock}
                    </p>
                    <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                      Rating : {product.rating}
                    </p>
                  </div>

                  {/* <p className={`${FilterStyle.p} ${FilterStyle.p3}`}>
       Price: {product.price}
     </p> */}

                  {/* <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
       In Stock : {product.stock}
     </p> */}
                  <div className={FilterStyle.product}>
                    <p className={FilterStyle.view}>VIEW PRODUCT</p>
                    <p className={FilterStyle.cart}>ADD TO CART</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={FilterStyle.card_list}>
            {products && Array.isArray(products) ? (
              products.map((product) => (
                <Link to={`/product-details/${product._id}`} key={product._id}>
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

                    <div className={FilterStyle.product}>
                      <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                        Stock : {product.stock}
                      </p>
                      <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                        Rating : {product.rating}
                      </p>
                    </div>

                    {/* <p className={`${FilterStyle.p} ${FilterStyle.p3}`}>
        Price: {product.price}
      </p> */}

                    {/* <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
        In Stock : {product.stock}
      </p> */}
                    <div className={FilterStyle.product}>
                      <p className={FilterStyle.view}>VIEW PRODUCT</p>
                      <p className={FilterStyle.cart}>ADD TO CART</p>
                    </div>
                  </div>
                </Link>
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

export default ProductList;
