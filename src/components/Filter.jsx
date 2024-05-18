import FilterStyle from "./Filter.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Filter() {
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const [uniqueBrands, setUniqueBrands] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/product");
        // setProductShow(response.data.Product);
        // console.log("responseProduct", response.data.product);
        setProducts(response.data.product);
        // Extract unique categories from products
        const categoriesSet = new Set(
          response.data.product.map((product) => product.category)
        );
        setUniqueCategories(categoriesSet);
        const brandsSet = new Set(
          response.data.product.map((brand) => brand.brand)
        );
        setUniqueBrands(brandsSet);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const category = event.target.value;

    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // Remove the category if it's already selected
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Add the category if it's not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleChangeBrand = (event) => {
    const brand = event.target.value;

    // Check if the category is already selected
    if (selectedBrands.includes(brand)) {
      // Remove the category if it's already selected
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      // Add the category if it's not selected
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // const filteredProducts = products.filter((product) => {
  //   if (selectedCategories.length > 0 && selectedBrands.length > 0) {
  //     // Filter if both categories and brands are selected
  //     return (
  //       selectedCategories.includes(product.category) &&
  //       selectedBrands.includes(product.brand)
  //     );
  //   } else if (selectedCategories.length > 0) {
  //     // Filter only based on selected categories
  //     return selectedCategories.includes(product.category);
  //   } else if (selectedBrands.length > 0) {
  //     // Filter only based on selected brands
  //     return selectedBrands.includes(product.brand);
  //   } else {
  //     // Show all products if no categories or brands selected
  //     return true;
  //   }
    
  // });


  const filteredProducts = products.filter((product) => {
  const isCategoryMatch =
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category);

  const isBrandMatch =
    selectedBrands.length === 0 || selectedBrands.includes(product.brand);

  const isPriceInRange =
    (!minPrice || product.price >= minPrice) &&
    (!maxPrice || product.price <= maxPrice);

  return isCategoryMatch && isBrandMatch && isPriceInRange;
});


  const handlePriceChange = (event) => {
    const { name, value } = event.target;

    if (name === "minPrice") {
      setMinPrice(value === "" ? null : parseInt(value, 10));
    } else if (name === "maxPrice") {
      setMaxPrice(value === "" ? null : parseInt(value, 10));
    }
  };

  return (
    <>
      <div className={FilterStyle.filter_container}>
        <div className={FilterStyle.fixd_left}>
          <h3>Filter by</h3>
          <div className={FilterStyle.categories}>
            <h4
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              {isCategoryDropdownOpen ? "Categories -" : "Categories +"}
            </h4>
            {isCategoryDropdownOpen && (
              <div>
                {/* <div className={FilterStyle.categories_list}> */}
                {Array.from(uniqueCategories).map((category) => (
                  <div key={category} className={FilterStyle.categories_list}>
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleChange}
                    />
                    <label htmlFor={category} className={FilterStyle.filter}>{category}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={FilterStyle.categories}>
            <h4 onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}>
              {isBrandDropdownOpen ? "Brand -" : "Brand +"}
            </h4>
            {isBrandDropdownOpen && (
              <div>
                {/* <div className={FilterStyle.categories_list}> */}
                {Array.from(uniqueBrands).map((brand) => (
                  <div key={brand} className={FilterStyle.categories_list}>
                    <input
                      type="checkbox"
                      id={brand}
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={handleChangeBrand}
                    />
                    <label htmlFor={brand} className={FilterStyle.filter}>{brand}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={FilterStyle.categories}>
          <h4>Price</h4>
          <div className={FilterStyle.categories_list}>
            <label htmlFor="minPrice">
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={minPrice || ""}
                placeholder="Min Price"
                onChange={handlePriceChange}
              />
            </label>
            <label htmlFor="maxPrice">
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={maxPrice || ""}
                placeholder="Max Price"
                onChange={handlePriceChange}
              />
            </label>
          </div>
          {/* <div className={FilterStyle.categories_list}>
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="topwear"
                  id="topwear"
                />
              </label>
              <label htmlFor="">Any</label>
              <br />
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="bottomwear"
                  id="bottomwear"
                />
              </label>
              <label htmlFor="">$0 to $500</label>
              <br />
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="footwear"
                  id="footwear"
                />
              </label>
              <label htmlFor="">$501 to $1000</label>
              <br />
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="footwear"
                  id="footwear"
                />
              </label>
              <label htmlFor="">$1001 to $1500</label>
              <br />
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="footwear"
                  id="footwear"
                />
              </label>
              <label htmlFor="">$1501 to $2000</label>
              <br />
              <label htmlFor="">
                <input
                  className={FilterStyle.checkbox}
                  type="checkbox"
                  name="footwear"
                  id="footwear"
                />
              </label>
              <label htmlFor="">More than $3000</label>
            </div> */}
        </div>
        </div>
       
        {/* </div> */}
        <div className={FilterStyle.card_mr}>
          <h3 className={FilterStyle.products}>Products</h3>
          <div className={FilterStyle.card_container}>
            {filteredProducts ? (
              <div className={FilterStyle.card_list}>
                {filteredProducts.map((product) => (
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
                        Discount: {product.discountPercentage}%
                      </p>
                      <p className={FilterStyle.p}>
                        Special Price : $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>

                      <div className={FilterStyle.product}>
                        <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                          Stock : {product.stock}
                        </p>
                        <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                          Rating : {product.rating}
                        </p>
                      </div>
                      {/* <div className={FilterStyle.product}>
                      <p className={FilterStyle.view}>VIEW PRODUCT</p>
                      <p className={FilterStyle.cart}>ADD TO CART</p>
                    </div> */}
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
                          Discount: {product.discountPercentage}%
                        </p>
                        <p className={FilterStyle.p}>
                          Special Price : $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>

                        <div className={FilterStyle.product}>
                          <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                            Stock : {product.stock}
                          </p>
                          <p className={`${FilterStyle.p} ${FilterStyle.stock}`}>
                            Rating : {product.rating}
                          </p>
                        </div>
                        {/* <div className={FilterStyle.product}>
                      <p className={FilterStyle.view}>VIEW PRODUCT</p>
                      <p className={FilterStyle.cart}>ADD TO CART</p>
                    </div> */}
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
      </div>
    </>
  );
}
export default Filter;
