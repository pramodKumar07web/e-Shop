import React, { useContext, useEffect, useState } from "react";
import FilterStyle from "./ProductList.module.css";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import Filter from "../filter/Filter";
import { Pagination } from "../common/Pagination";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const {
    products,
    filteredProducts,
    totalProducts,
    setProducts,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedBrands,
    setTotalProducts,
  } = useContext(UserContext);

  const [page, setPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const limit = 10;

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
        const response = await axios.get("http://localhost:3005/products", {
          params: {
            page,
            limit,
            selectedCategories: selectedCategories.join(","),
            selectedBrands: selectedBrands.join(","),
            minPrice,
            maxPrice,
          },
        });
        console.log(" Header:", response);
        setProducts(response.data.product);
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
    maxPrice,
    minPrice,
    page,
    selectedBrands,
    selectedCategories,
    setProducts,
    setTotalProducts,
  ]);

  const [sortType, setSortType] = useState("rating"); // Default sort type
  const [showSortOptions, setShowSortOptions] = useState(false); // Manage visibility of sort options

  const sortProducts = (type) => {
    let sortedProducts;
    switch (type) {
      case "rating":
        sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case "priceLowToHigh":
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = products;
    }
    setProducts(sortedProducts);
    setSortType(type);
  };

  const handleSortChange = (type) => {
    sortProducts(type);
    setShowSortOptions(false); // Hide sort options after selection
  };

  return (
    <>
      <button className={FilterStyle.filterIcon} onClick={toggleFilter}>
        <i class="fa-solid fa-filter icon"></i>
      </button>
      <div className={FilterStyle.container}>
        <div
          className={`${FilterStyle.filterPage} ${
            isFilterVisible ? FilterStyle.visible : ""
          }`}
        >
          <div className={FilterStyle.header}>
            <button onClick={toggleFilter}>Close</button>
          </div>
          <div className={FilterStyle.content}>
            <h2>Filter Options</h2>
            <Filter />
          </div>
        </div>
      </div>
      <div className={FilterStyle.card_mr}>
        <div className={FilterStyle.sort}>
          <div className={FilterStyle.sortContainer}>
            <button
              className={FilterStyle.sortButton}
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              Sort
              <ChevronDownIcon className={FilterStyle.chevron} />
            </button>
            {showSortOptions && (
              <div className={FilterStyle.sortOptions}>
                <button
                  onClick={() => handleSortChange("rating")}
                  className={`${FilterStyle.sortButton} ${
                    sortType === "rating" ? FilterStyle.active : ""
                  }`}
                >
                  Best Rating
                </button>
                <button
                  onClick={() => handleSortChange("priceLowToHigh")}
                  className={`${FilterStyle.sortButton} ${
                    sortType === "priceLowToHigh" ? FilterStyle.active : ""
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange("priceHighToLow")}
                  className={`${FilterStyle.sortButton} ${
                    sortType === "priceHighToLow" ? FilterStyle.active : ""
                  }`}
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className={FilterStyle.products}>Products</h2>
        <div className={FilterStyle.card_container}>
          {filteredProducts && filteredProducts ? (
            <div className={FilterStyle.card_list}>
              {filteredProducts.map((product) => (
                <div className={FilterStyle.card}>
                <Link to={`/product-details/${product._id}`} key={product._id}>
                 
                    <img
                      className={FilterStyle.img}
                      src={product.thumbnail}
                      alt=""
                    />
                    <h3>{product.title}</h3>
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
                    
                </Link>
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
                      <p className={FilterStyle.view}>VIEW PRODUCT</p>
                    <p className={FilterStyle.cart}>ADD TO CART</p>
                    </div>
                </div>
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
\                      <p className={`${FilterStyle.p} ${FilterStyle.p3}`}>
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
