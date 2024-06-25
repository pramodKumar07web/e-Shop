import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css"; // Import your CSS module file
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import Navbar from "../navbar/Navbar";

function Checkout() {
  const {
    userInfo,
    totalItems,
    totalAmount,
    cartItems,
    setCartItems,
    fetchCartItems,
    currentOrder,
    setCurrentOrder,
    fetchLoggedInUser,
  } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const items = cartItems;

  const changeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3005/updateUser/${userInfo.id}`,
        { addresses: [...userInfo.addresses, data] }
      );
      if (response && response.data) {
        fetchLoggedInUser();
      } else {
        console.log("addAddress failed");
      }
    } catch (error) {
      console.error("Error during address api", error);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const order = {
      items,
      totalAmount,
      totalItems,
      user: userInfo.id,
      paymentMethod,
      selectedAddress,
      status: "pending",
    };

    try {
      const response = await axios.post("http://localhost:3005/orders", order);
      if (response.data) {
        setCurrentOrder(response.data);
      } else {
        console.error("Failed order");
      }
    } catch (error) {
      console.log("Internal Server Error frontend");
      console.error("Error during order api", error);
    }
  };

  const handleAddress = (e) => {
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axios.patch(`http://localhost:3005/cart/${id}`, {
        quantity,
      });
      const updatedItem = response.data;
      if (updatedItem) {
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleRemove = async (e, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/cart/${id}`
      );
      if (response) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder._id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout`} replace={true}></Navigate>
      )}
      <Navbar/>
      <div className={styles.containerx}>
        {/* <div className={styles.customForm}> */}
        <form className={styles.customForm} noValidate onSubmit={handleSubmit}>
          <div className={styles.spaceY12}>
            <div className={styles.borderBottom}>
              <h2 className={styles.formHeading}>Personal Information</h2>
              <p className={styles.formDescription}>
                Use a permanent address where you can receive mail.
              </p>

              <div className={styles.formGrid}>
                <div className={styles.formColumn}>
                  <label htmlFor="name" className={styles.formLabel}>
                    First name
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={changeData}
                      id="name"
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email address
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={changeData}
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="phone"
                      name="phone"
                      value={data.phone}
                      onChange={changeData}
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumnFull}>
                  <label htmlFor="street" className={styles.formLabel}>
                    Street address
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="text"
                      name="street"
                      value={data.street}
                      onChange={changeData}
                      id="street"
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label htmlFor="city" className={styles.formLabel}>
                    City
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="text"
                      name="city"
                      value={data.city}
                      onChange={changeData}
                      id="city"
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label htmlFor="state" className={styles.formLabel}>
                    State / Province
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="text"
                      name="state"
                      value={data.state}
                      onChange={changeData}
                      id="state"
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label htmlFor="pinCode" className={styles.formLabel}>
                    ZIP / Postal code
                  </label>
                  <div className={styles.formInput}>
                    <input
                      type="text"
                      name="pinCode"
                      value={data.pinCode}
                      onChange={changeData}
                      id="pinCode"
                      className={styles.formField}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formSubmitContainer}>
              <button type="button" className={styles.formReset}>
                Reset
              </button>
              <button type="submit" className={styles.formSubmit}>
                Add Address
              </button>
            </div>
            <div className={styles.addressContainer}>
              <h2 className={styles.addressHeading}>Address</h2>
              <p className={styles.addressDescription}>
                Choose from Existing address
              </p>
              <ul className={styles.addressList}>
                {userInfo &&
                  userInfo.addresses &&
                  userInfo.addresses.map((address, index) => (
                    <li key={index} className={styles.addressItem}>
                      <div className={styles.addressDetails}>
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                        />
                        <div>
                          <p className={styles.textSm}>{address.name}</p>
                          <p className={styles.textSm}>{address.street}</p>
                          <p className={styles.textXs}>{address.city}</p>
                        </div>
                      </div>
                      <div className={styles.addressRight}>
                        <p className={styles.textSm}>{address.pinCode}</p>
                        <p className={styles.textSm}>{address.state}</p>
                        <p className={styles.textSm}>Phone : {address.phone}</p>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className={styles.paymentMethodsContainer}>
                <fieldset>
                  <legend className={styles.paymentMethodsHeading}>
                    Payment Methods
                  </legend>
                  <p className={styles.paymentMethodsDescription}>Choose One</p>
                  <div className={styles.paymentMethodsList}>
                    <div className={styles.paymentMethod}>
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        checked={paymentMethod === "cash"}
                        type="radio"
                      />
                      <label
                        htmlFor="cash"
                        className={styles.paymentMethodsLabel}
                      >
                        Cash
                      </label>
                    </div>
                    <div className={styles.paymentMethod}>
                      <input
                        id="card"
                        name="payments"
                        onChange={handlePayment}
                        value="card"
                        checked={paymentMethod === "card"}
                        type="radio"
                      />
                      <label
                        htmlFor="card"
                        className={styles.paymentMethodsLabel}
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
        {/* </div> */}
        <div className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <h1 className={styles.cartHeading}>Cart</h1>
          </div>
          <div className={styles.cartItems}>
            <ul className={styles.cartItemsList}>
              {items.map((item) => (
                <div className={styles.cart}>
                <div key={item.product.id} className={styles.cartItem}>
                  <div className={styles.cartItemImage}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                  </div>
                  <div className={styles.cartItemDetails}>
                    <div>
                      <div className={styles.cartItemTitle}>
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className={styles.cartItemPrice}>
                          ${item.product.discountPrice}
                        </p>
                      </div>
                      <p className={styles.cartItemBrand}>
                        {item.product.brand}
                      </p>
                    </div>
                   
                  </div>
                  
                </div>
                <div className={styles.cartItemActions}>
                <div className={styles.cartItemQuantity}>
                  <label htmlFor="quantity">Qty : </label>
                  <select
                    onChange={(e) =>
                      updateQuantity(item._id, e.target.value)
                    }
                    value={item.quantity}
                    className={styles.cartItemQuantitySelect}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <div className={styles.cartItemRemove}>
                    <button
                      onClick={(e) => handleRemove(e, item._id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              </div>
              ))}
            </ul>
          </div>

          <div className={styles.cartSummaryContainer}>
            <div className={styles.cartSummary}>
              <p>Subtotal : ${totalAmount}</p>
            </div>
            <div className={styles.cartSummary}>
              <p>Total Items in Cart : {totalItems} items</p>
            </div>
            <p className={styles.cartNote}>
              Shipping and taxes calculated at checkout.
            </p>
            <div className={styles.cartAction}>
              <div onClick={handleOrder} className={styles.cartActionButtons}>
                <div className={styles.cartActionButton}>Order Now</div>
              </div>
            </div>
            <div className={styles.cartContinue}>
              <p className={styles.cartActionButtonOr}>
                or{" "}
                <Link to="/">
                  <button type="button" className={styles.continueShoppingLink}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
