import React, { useContext, useEffect, useState } from "react";
import CartStyle from "./Cart.module.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

function Cart() {
  const {totalAmount, totalItems, cartItems, handleRemove, fetchCartItems } =
    useContext(UserContext);
    // const [cartLoaded, setCartLoaded] = useState(false);
    console.log('cartItems',cartItems.length)

    // if(cartItems){
    //   setCartLoaded(true)
    // }

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axios.patch(`/cart/updateCart/${id}`, {
        quantity,
      });
      const updatedItem = response.data;
      if (updatedItem) {
        fetchCartItems();
      }
      // setCartItems((prevItems) =>
      //   prevItems.map((item) => (item._id === id ? updatedItem : item))
      // );
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  // const handleRemove = async (e, id) => {
  //   try {
  //     // Make a request to remove the item from the cart based on its id
  //     const response = await axios.delete(
  //       `/api/cart/${id}`
  //     );
  //     // Update the cart items after successful removal
  //     if (response) {
  //       setCartItems((prevItems) =>
  //         prevItems.filter((item) => item._id !== id)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error removing item from the cart:", error);
  //   }
  // };


  // makePayment integration

  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}
    <div className={CartStyle.body}>
    
      {/* <div className={CartStyle.home_page}>
        <h1>Cart Page</h1>
        <p>WellCome to the world of fashion</p>
      </div> */}
      <div>
        <div className={CartStyle.cards_container}>
          <div className={CartStyle.items}>
            <h2 className={CartStyle.details}>Cart</h2>
            {cartItems &&
              cartItems.map((item) => (
                <div className={CartStyle.cards1}>
                  <img
                    className={CartStyle.img1}
                    src={item.product.thumbnail}
                    alt=""
                  />
                   <h3 className={CartStyle.inline}>{item.product.title}</h3>
                  
                   <div className={CartStyle.p3}>
                   <p className={CartStyle.g}>{item.product.brand}</p>
                  <p className={CartStyle.specialPrice}>
                    {" "}
                    Special Price : $
                    {Math.round(
                      item.product.price *
                        (1 - item.product.discountPercentage / 100)
                    )}
                  </p>
                  <p className={`${CartStyle.price} ${CartStyle.p3p}`}>
                    Price: $<strike>{item.product.price}</strike>
                  </p>
                  </div>
                   <div className={CartStyle.updateQuantity}>
                    <label htmlFor="quantity">Qty : </label>
                    <select
                      className={CartStyle.updateQuantitySelect}
                      onChange={(e) => updateQuantity(item._id, e.target.value)}
                      value={item.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <p className={`${CartStyle.pp} ${CartStyle.stock}`}>
                    In Stock : {item.product.stock}
                  </p>
                
                  <div className={CartStyle.product}>
                    <Link to={`/product-details/${item._id}`} key={item._id}>
                      <p className={CartStyle.view}>VIEW PRODUCT</p>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(item._id)}
                      className={CartStyle.cart}
                    >
                      REMOVE PRODUCT
                    </button>
                  </div>
                </div>
              ))}
            <div className={CartStyle.total}>
              <p>
                Total Amount: <span>${totalAmount}</span>
              </p>
              <p>
                Total Items in Cart:<span> {totalItems} Items</span>
              </p>
            </div>
          </div>

          {/* <div className={CartStyle.cards2}>
            <h3 className={CartStyle.details}>Your Cart Summary</h3>
            <h3>Total: $869</h3>
            <label htmlFor="" className={CartStyle.delivery}>
              Delivery Address:
            </label>
            <br />
            <label htmlFor="">
              <input
                type="text"
                name="address"
                className={CartStyle.address}
                placeholder="Type your delivery address here..."
              />
            </label>

            <div className={CartStyle.payment}>
              <div className={CartStyle.debit_card}>
                <div className={CartStyle.icon_debit}>
                  <i class="fa-solid fa-credit-card"></i>
                  <p>Pay with card</p>
                </div>
                <img className={CartStyle.card_img} src={visa} alt="#" />
                <img className={CartStyle.card_img} src={mastercard} alt="#" />
                <img className={CartStyle.card_img} src={amex} alt="#" />
                <img className={CartStyle.card_img} src={jcb} alt="#" />
                <img className={CartStyle.card_img} src={discover} alt="#" />
              </div>
              <div>
                <label htmlFor="" className={CartStyle.card_number}>
                  Card Number:
                </label>
                <br />
                <label htmlFor="">
                  <input
                    type="number"
                    name="number"
                    className={CartStyle.number}
                    placeholder="  **** **** **** **** "
                  />
                </label>
                <br />
                <label htmlFor="" className={CartStyle.card_number}>
                  Expiration Date <span>(MM/YY)</span>
                </label>
                <br />
                <label htmlFor="">
                  <input
                    type="number"
                    name="number"
                    className={CartStyle.number}
                    placeholder="  MM/YY "
                  />
                </label>
                <br />
              </div>
            </div>
            <div className={CartStyle.another_pay}>
              <Link to="/">Choose another way to pay</Link>
              <br />
              <button className={CartStyle.btn}>Pay</button>
            </div>
          </div> */}
        </div>
        <div className={CartStyle.checkoutBtn}>
          <Link to="/checkout">
            <button className={CartStyle.btn}>Checkout</button>
          </Link>
          <p className={CartStyle.or}>
            or
            <Link to="/">
              <button type="button">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;
