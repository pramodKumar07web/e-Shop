import FilterStyle from "./Filter.module.css";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

function Filter() {
  const {
    categories,
    brands,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice,
    selectedBrands,
    setSelectedBrands,
    selectedCategories,
    setSelectedCategories,
  } = useContext(UserContext);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);



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
          <h3 className={FilterStyle.h3}>Filter by</h3>
          <div className={FilterStyle.categories}>
            <h4
              className={FilterStyle.catFixed}
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              {isCategoryDropdownOpen ? "Categories -" : "Categories +"}
            </h4>
            {isCategoryDropdownOpen && (
              <div className={FilterStyle.list_mr}>
                {categories.map((cate, index) => (
                  <div key={index} className={FilterStyle.categories_list}>
                    <input
                      type="checkbox"
                      id={cate.category}
                      value={cate.category}
                      checked={selectedCategories.includes(cate.category)}
                      onChange={handleChange}
                    />
                    <label htmlFor={cate.category} className={FilterStyle.filter}>
                      {cate.category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={FilterStyle.categories}>
            <h4
              className={FilterStyle.brandFixed}
              onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
            >
              {isBrandDropdownOpen ? "Brand -" : "Brand +"}
            </h4>
            {isBrandDropdownOpen && (
              <div className={FilterStyle.list_mr}>
                {brands.map((br,index) => (
                  <div key={index} className={FilterStyle.categories_list}>
                    <input
                      type="checkbox"
                      id={br.brand}
                      value={br.brand}
                      checked={selectedBrands.includes(br.brand)}
                      onChange={handleChangeBrand}
                    />
                    <label htmlFor={br.brand} className={FilterStyle.filter}>
                      {br.brand}
                    </label>
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
      </div>
    </>
  );
}
export default Filter;
