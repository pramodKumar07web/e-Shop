import React, { useContext, useEffect, useState } from "react";
import FilterStyle from "./ProductList.module.css";
import styles from "../filter/FilterToggle.module.css";
import style from "../filter/FilterPage.module.css";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import Filter from "../filter/Filter";
import { Pagination } from "../common/Pagination";
import axios from "axios";

const ProductList = () => {
  const {
    products,
    filteredProducts,
    totalProducts,
    setCategories,
    brand,
    setBrand,
    setProducts,
    setUniqueCategories,
    uniqueBrands,
    setUniqueBrands,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedBrands,
    uniqueCategories,
    setTotalProducts,
  } = useContext(UserContext);

  const [page, setPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const limit = 10;
  console.log("filteredProducts", filteredProducts);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    setPage(1);
  }, [totalProducts]);

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [totalProducts, minPrice, maxPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/product", {
          params: {
            page,
            limit,
            // selectedCategories,
            // selectedBrands,
            selectedCategories: selectedCategories.join(","),
            selectedBrands: selectedBrands.join(","),
            minPrice,
            maxPrice,
          },
        });
        console.log(" Header:", response);
        setProducts(response.data.product);

        const brandd = response.data.product.map((product) => product.brand);
        setBrand(brandd);

        const cate = response.data.product.map((product) => product.category);
        setCategories(cate);

        // Extract unique categories from products
        const categoriesSet = new Set(
          response.data.product.map((product) => product.category)
        );
        setUniqueCategories(categoriesSet);

        // Extract unique brands from products
        const brandsSet = new Set(
          response.data.product.map((brand) => brand.brand)
        );
        setUniqueBrands(brandsSet);

        // Attempt to access header in different cases
        const totalItems =
          (await response.headers.get("x-total-count")) ||
          response.headers.get("X-Total-Count");
        console.log("X-Total-Count Header:", totalItems);

        if (totalItems !== undefined) {
          setTotalProducts(Number(totalItems));
        } else {
          // Fallback to length of products array
          setTotalProducts(response.data.product.length);
          console.warn(
            "X-Total-Count header is missing in the response. Using products length as fallback."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    page,
    limit,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    setProducts,
    setBrand,
    setCategories,
    setUniqueCategories,
    setUniqueBrands,
    setTotalProducts,
  ]);

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
                    <div className={FilterStyle.product}>
                      {product.deleted && (
                        <div>
                          <p className={FilterStyle.textRed}>product deleted</p>
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
                    <div className={FilterStyle.product}>
                      {/* <p className={FilterStyle.view}>VIEW PRODUCT</p>
                    <p className={FilterStyle.cart}>ADD TO CART</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={FilterStyle.card_list}>
              {products && Array.isArray(products) ? (
                products.map((product) => (
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
      <Pagination page={page} handlePage={handlePage} />
    </>
  );
};

export default ProductList;
