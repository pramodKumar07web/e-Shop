import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductStyle from "./ProductsDetails.module.css";
import axios from "axios";
import UserContext from "../context/UserContext";

function ProductsDetails() {
  const { id } = useParams();
  const { userId } = useContext(UserContext);
  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/products/${id}`
        );
        if (response.data.product) {
          setProducts(response.data.product);
        } else {
          setProducts(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Call the backend API to get all cart items
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/cart/${id}`
        );
        if (response) {
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleCart = async (e) => {
    e.preventDefault();

    if (products && products.length > 0) {
      const selectedProduct = products[0];
      console.log("lse",selectedProduct._id)
      const newItem = {
        product:selectedProduct._id,
        quantity: 1,
        userId,
      };
      delete newItem["id"];

      try {
        const response = await axios.post(
          "http://localhost:3005/api/cart/add",
          newItem
        );
        if (response.data) {
          console.log("Product added to the cart");
        } else {
          console.error("Failed to add product to the cart");
        }
      } catch (error) {
        console.error("Error adding product to the cart:", error);
      }
    }
  };

  return (
    <>
      <div className={ProductStyle.home_page}>
        <h1>Products Details Page</h1>
        <p>WellCome to the world of fashion</p>
      </div>

      <div className={ProductStyle.cards_container}>
        {cartItems &&
          cartItems.map((item) => (
            <div className={ProductStyle.cards}>
             <div className={ProductStyle.images}>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={item.products.images[0]}
                    alt={item.products.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={item.products.images[1]}
                    alt={item.products.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={item.products.images[2]}
                    alt={item.products.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={item.products.images[3]}
                    alt={item.products.title}
                  />
                </div>
              </div>
              <h3>{item.products.title}</h3>
              
              <p className={ProductStyle.p3}>
                {" "}
                Price: $<strike>{item.products.price}</strike>
              </p>
              <p className={`${ProductStyle.p} ${ProductStyle.p3}`}>
                Discount: {item.products.discountPercentage}%
              </p>
              <p className={ProductStyle.p3}>
                Special Price : $
                {Math.round(
                  item.products.price * (1 - item.products.discountPercentage / 100)
                )}
              </p>
              <p className={ProductStyle.p}>Brand : {item.products.brand}</p>
              <p className={ProductStyle.p}>Category : {item.products.category}</p>
              <p className={`${ProductStyle.p} ${ProductStyle.description}`}>
                Description : {item.products.description}
              </p>
              <div className={ProductStyle.product}>
                <p className={`${ProductStyle.p} ${ProductStyle.stock}`}>
                  In Stock : {item.products.stock}
                </p>
                <p className={`${ProductStyle.p} ${ProductStyle.stock}`}>
                  Rating : {item.products.rating}
                </p>
              </div>
              <div className={ProductStyle.product}>
                {/* <p className={ProductStyle.view}>VIEW PRODUCT</p> */}
                <Link to='/cart-page' className={ProductStyle.cart}>
                  GO TO CART
                </Link>
              </div>
            </div>
          ))}

        {products !== null &&
          products.map((product) => (
            <div className={ProductStyle.cards} key={product._id}>
              <h3 className={ProductStyle.details}>Products Details</h3>
              <div className={ProductStyle.images}>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={product.images[1]}
                    alt={product.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={product.images[2]}
                    alt={product.title}
                  />
                </div>
                <div className={ProductStyle.img1}>
                  <img
                    className={ProductStyle.img2}
                    src={product.images[3]}
                    alt={product.title}
                  />
                </div>
              </div>

              <h3>{product.title}</h3>
              <p className={ProductStyle.p3}>
                {" "}
                Price: $<strike>{product.price}</strike>
              </p>
              <p className={`${ProductStyle.p} ${ProductStyle.p3}`}>
                Discount: {product.discountPercentage}%
              </p>
              <p className={ProductStyle.p3}>
                Special Price : $
                {Math.round(
                  product.price * (1 - product.discountPercentage / 100)
                )}
              </p>
              <p className={ProductStyle.p}>Brand : {product.brand}</p>
              <p className={ProductStyle.p}>Category : {product.category}</p>
              <p className={`${ProductStyle.p} ${ProductStyle.description}`}>
                Description : {product.description}
              </p>
              <div className={ProductStyle.product}>
                <p className={`${ProductStyle.p} ${ProductStyle.stock}`}>
                  In Stock : {product.stock}
                </p>
                <p className={`${ProductStyle.p} ${ProductStyle.stock}`}>
                  Rating : {product.rating}
                </p>
              </div>
              <div className={ProductStyle.product}>
                {/* <p className={ProductStyle.view}>VIEW PRODUCT</p> */}
                <p onClick={handleCart} className={ProductStyle.cart}>
                  ADD TO CART
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductsDetails;
