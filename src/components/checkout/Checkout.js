import React, { useContext, useState } from "react";
import "./Checkout.css"; // Import your custom CSS file
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

function Checkout() {
  const { userInfo, totalItems, totalAmount, cartItems, setCartItems, fetchCartItems, currentOrder ,setCurrentOrder, fetchLoggedInUser  } =
    useContext(UserContext);
    console.log('currentOrder',currentOrder)
      const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  // const [currentOrder, setCurrentOrder] = useState(null);
  // console.log("currentOrder", currentOrder._id);
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
        // console.log("addAddress", response.data);
        fetchLoggedInUser()
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
        user:userInfo.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered,received.
      };
    // };
    try {
      const response = await axios.post(
        "http://localhost:3005/orders",
        order
      );
      if (response.data) {
        console.log("Product Order Successfully",response.data);
        setCurrentOrder(response.data)
      } else {
        console.error("Failed order");
      }
    } catch (error) {
      console.log('Internal Server Error frontend')
      console.error("Error during order api", error);
    }
  };


   const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };

   const handlePayment = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await axios.patch(`http://localhost:3005/cart/${id}`, { quantity });
      const updatedItem = response.data;
      if(updatedItem){
        fetchCartItems()
      }
      // setCartItems((prevItems) =>
      //   prevItems.map((item) => (item._id === id ? updatedItem : item))
      // );
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };

  const handleRemove = async (e, id) => {
    try {
      // Make a request to remove the item from the cart based on its id
      const response = await axios.delete(
        `http://localhost:3005/api/cart/${id}`
      );
      // Update the cart items after successful removal
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
    <div className="containerx">
      <div className="lg-col-span-3">
        <form className="custom-form" noValidate onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900 pb-12">
              <h2 className="form-heading">Personal Information</h2>
              <p className="form-description">
                Use a permanent address where you can receive mail.
              </p>

              <div className="form-grid">
                <div className="form-column">
                  <label htmlFor="name" className="form-label">
                    First name
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={changeData}
                      id="name"
                      className="form-field"
                     required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="form-input">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={changeData}
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <div className="form-input">
                    <input
                      type="phone"
                      name="phone"
                      value={data.phone}
                      onChange={changeData}
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-column-full">
                  <label htmlFor="street" className="form-label">
                    Street address
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      name="street"
                      value={data.street}
                      onChange={changeData}
                      id="street"
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      name="city"
                      value={data.city}
                      onChange={changeData}
                      id="city"
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <label htmlFor="state" className="form-label">
                    State / Province
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      name="state"
                      value={data.state}
                      onChange={changeData}
                      id="state"
                      className="form-field"
                      required
                    />
                  </div>
                </div>

                <div className="form-column">
                  <label htmlFor="pinCode" className="form-label">
                    ZIP / Postal code
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      name="pinCode"
                      value={data.pinCode}
                      onChange={changeData}
                      id="pinCode"
                      className="form-field"
                      required                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="form-reset">
                Reset
              </button>
              <button type="submit" className="form-submit">
                Add Address
              </button>
            </div>
            <div className="address-container border-b border-gray-900/10 pb-12">
              <h2 className="address-heading text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="address-description mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing address
              </p>
              <ul className="address-list">
                {userInfo &&
                  userInfo.addresses &&
                  userInfo.addresses.map((address, index) => (
                    <li key={index} className="address-item">
                      <div className="address-details">
                        <input
                            onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                        />
                        <div>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {address.pinCode}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {address.state}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          Phone : {address.phone}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className="mt-10 space-y-10 payment-methods-container">
                <fieldset>
                  <legend className="payment-methods-heading text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="payment-methods-description mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 payment-methods-list space-y-6">
                    <div className="payment-method">
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
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="payment-method">
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
                        className="block text-sm font-medium leading-6 text-gray-900"
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
      </div>
      <div className="lg-col-span-2">
        <div className="cart-container mx-auto my-12 bg-white">
          <div className="border-t border-gray-200 px-0 py-6">
            <h1 className="cart-heading">Cart</h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="cart-item flex">
                    <div className="cart-item-image">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                      />
                    </div>
                    <div className="cart-item-details ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${item.product.discountPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 cart-item-quantity">
                        <label htmlFor="quantity">Qty : </label>
                    <select
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
                        <div className="flex cart-item-remove">
                          <button onClick={(e) => handleRemove(e, item._id)} type="button">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-2 py-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal : ${totalAmount}</p>
              {/* <p>$ {totalAmount}</p> */}
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart : {totalItems} items</p>
              {/* <p>{totalItems} items</p> */}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <div
                onClick={handleOrder}
                className="cart-action-buttons flex justify-center"
              >
                <div className="cart-action-button">Order Now</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p className="cart-action-button-or">
                or{" "}
                <Link to="/">
                  <button type="button" className="continue-shopping-link">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
