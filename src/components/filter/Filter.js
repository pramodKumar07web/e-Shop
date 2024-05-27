import FilterStyle from "./Filter.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Navbar from "../navbar/Navbar";

function Filter() {
  const {categories, setCategories, brand, setBrand, maxPrice, setMaxPrice,minPrice, setMinPrice,selectedBrands, setSelectedBrands,products, setProducts,uniqueCategories, setUniqueCategories,uniqueBrands, setUniqueBrands,selectedCategories, setSelectedCategories,} = useContext(UserContext)
  // const [products, setProducts] = useState([]);
  // const [uniqueCategories, setUniqueCategories] = useState(new Set());
  // const [uniqueBrands, setUniqueBrands] = useState(new Set());
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectedBrands, setSelectedBrands] = useState([]);
  // const [minPrice, setMinPrice] = useState(null);
  // const [maxPrice, setMaxPrice] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  // const [brand, setBrand] =useState([])
  // console.log('brand',brand)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/product");
        // setProductShow(response.data.Product);
        // console.log("responseProductbrad", response.data.product);
        setProducts(response.data.product);
        const brandd = (
          response.data.product.map((product) => product.brand)
        );
        setBrand(brandd)
        const cate = (
          response.data.product.map((product) => product.category)
        );
        setCategories(cate)
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setProducts, setUniqueBrands, setUniqueCategories]);

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


//   const filteredProducts = products.filter((product) => {
//   const isCategoryMatch =
//     selectedCategories.length === 0 ||
//     selectedCategories.includes(product.category);

//   const isBrandMatch =
//     selectedBrands.length === 0 || selectedBrands.includes(product.brand);

//   const isPriceInRange =
//     (!minPrice || product.price >= minPrice) &&
//     (!maxPrice || product.price <= maxPrice);

//   return isCategoryMatch && isBrandMatch && isPriceInRange;
// });


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
      {/* <Navbar/> */}
      <div className={FilterStyle.filter_container}>
        <div className={FilterStyle.fixd_left}>
          <h3 className={FilterStyle.h3}>Filter by</h3>
          <div className={FilterStyle.categories}>
            <h4 className={FilterStyle.catFixed}
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              { isCategoryDropdownOpen ? "Categories -" : "Categories +"}
            </h4>
            {isCategoryDropdownOpen && (
              <div className={FilterStyle.list_mr}>
                  
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
            <h4 className={FilterStyle.brandFixed} onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}>
              {isBrandDropdownOpen ? "Brand -" : "Brand +"}
            </h4>
            {isBrandDropdownOpen && (
              <div  className={FilterStyle.list_mr}>
              
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
          <h4>Price :</h4>
          <div className={FilterStyle.categories_list}>
            <label htmlFor="minPrice">
              <input
               className={FilterStyle.price}
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
              className={FilterStyle.price}
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={maxPrice || ""}
                placeholder="Max Price"
                onChange={handlePriceChange}
              />
            </label>
          </div>
        </div>
        </div>
      
       
     {/* // products */}
     
      </div>
    </>
  );
}
export default Filter;
