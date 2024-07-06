import React, { useContext, useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import ProductStyle from "./ProductsDetails.module.css";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useAlert } from "react-alert";

function ProductsDetails() {
  const alert = useAlert()
  const { id } = useParams();
  const { userId, fetchCartItems, cartItems } = useContext(UserContext);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/products/${id}`
        );
        if (response.data.product) {
          setProducts(response.data.product);
        } else {
          setProducts(null);
        }
      } catch (error) {
        alert.error("Error fetching data")
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [alert, id]);

  const handleCart = async (e) => {
    e.preventDefault();

    if (products && products.length > 0) {
      const selectedProduct = products[0];
      const existingCartItem = cartItems.find(
        (item) => item.product._id === selectedProduct._id
      );

      if (existingCartItem) {
        console.log("Product already in cart");
        alert.info("product already added");
        // Optionally update quantity here
      }else{
        const newItem = {
          product:selectedProduct._id,
          quantity: 1,
          userId,
        };
        delete newItem["id"];

        try {
          const response = await axios.post(
            "/cart/addToCart",
            newItem
          );
          if (response.data) {
            alert.success("Product added to the cart"); // Display a success alert
            fetchCartItems()
          } else {
            alert.error("Failed to add product to the cart"); // Display an error alert
            console.error("Failed to add product to the cart");
          }
        } catch (error) {
          alert.error("Error adding product to the cart"); // Display an error alert
          console.error("Error adding product to the cart:", error);
        }
      }
    }
  };
  return (
    <>
      {/* <div className={ProductStyle.home_page}>
        <h1>Products Details Page</h1>
        <p>WellCome to the world of fashion</p>
      </div> */}
      <div className={ProductStyle.container_center}>
      <div className={ProductStyle.cards_container}>
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
              <p className={ProductStyle.p}>
                {" "}
                Price: $<strike>{product.price}</strike>
              </p>
              <p className={`${ProductStyle.p} ${ProductStyle.p3}`}>
                Discount: {product.discountPercentage}%
              </p>
              <p className={ProductStyle.p}>
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
             
            </div>
          ))}
           <div className={ProductStyle.productFloat}>
                {/* <p className={ProductStyle.view}>VIEW PRODUCT</p> */}
                <p onClick={handleCart} className={ProductStyle.cart}>
                  ADD TO CART
                </p>
              </div>
      </div>
      </div>
      
    </>
  );
}

export default ProductsDetails;
