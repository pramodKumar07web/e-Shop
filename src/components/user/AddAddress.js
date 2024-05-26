import React, { useContext, useEffect, useState } from "react";
import "../checkout/Checkout.css"; // Import your custom CSS file
import AddAddressStyle from './AddAddress.module.css'
import UserContext from "../context/UserContext";
import axios from "axios";
import Navbar from "../navbar/Navbar";

function AddAddress() {
  const {
    userInfo,
    fetchLoggedInUser,
  } = useContext(UserContext);
//   console.log('userInfo',userInfo)
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

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
        fetchLoggedInUser();
      } else {
        console.log("addAddress failed");
      }
    } catch (error) {
      console.error("Error during address api", error);
    }
  };
  
  useEffect(() => {
    if (selectedEditIndex !== -1) {
      const address = userInfo.addresses[selectedEditIndex];
      setData(address);
    } else {
      setData({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
      });
    }
  }, [selectedEditIndex, userInfo]);


  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let updatedAddresses = [...userInfo.addresses];
      if (selectedEditIndex !== -1) {
        updatedAddresses[selectedEditIndex] = data;
      } else {
        updatedAddresses.push(data);
      }
  
      const response = await axios.post(`http://localhost:3005/updateUser/${userInfo.id}`, {
        addresses: updatedAddresses,
      });
  
      if (response && response.data) {
        fetchLoggedInUser();
        setShowAddAddressForm(false);
        setSelectedEditIndex(-1);
      } else {
        console.log("addAddress failed");
      }
    } catch (error) {
      console.error("Error during address api", error);
    }
  };
  

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    // setShowAddAddressForm(true);
  };

  const handleRemove = async (index) => {
    try {
      // Create a new array of addresses excluding the one at the specified index
      let updatedAddresses = userInfo.addresses.filter((_, i) => i !== index);
  
      // Send the updated addresses array to the backend
      const response = await axios.post(`http://localhost:3005/updateUser/${userInfo.id}`, {
        addresses: updatedAddresses,
      });
  
      // If the response is successful, fetch the updated user info
      if (response && response.data) {
        fetchLoggedInUser();
      } else {
        console.log("removeAddress failed");
      }
    } catch (error) {
      console.error("Error during address api", error);
    }
  };
  

  return (
    <>
    <Navbar/>
    <h2>My Profile</h2>
      <div className={AddAddressStyle.container}>
      
        <div className="lg-col-span-3">
       {userInfo &&
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name : {userInfo.name ? userInfo.name : "New User"}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-500">
              Email Address: {userInfo.email}
            </h3>
            {userInfo.role === "admin" && (
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-500">
                role: {userInfo.role}
              </h3>
            )}
          </div>}
          <button className={AddAddressStyle.addBtn}
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="form-reset"  onClick={(e) => {
              setShowAddAddressForm(false);
              // setSelectedEditIndex(-1);
            }}>
                    Cancel
                  </button>
                  <button type="submit" className="form-submit">
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <p className="mt-0.5 text-xl my-2 text-gray-800">Your Addresses :</p>
          <div className="address-container border-b border-gray-900/10 pb-12">
            <ul className="address-list">
              {userInfo &&
                userInfo.addresses &&
                userInfo.addresses.map((address, index) => (
                  <div>
                    {selectedEditIndex === index ? (
                      <form
                        className="custom-form"
                        noValidate
                        onSubmit={handleSubmitEdit}
                      >
                        <div className="space-y-12">
                          <div className="border-b border-gray-900 pb-12">
                            <h2 className="form-heading">
                              Personal Information
                            </h2>
                            <p className="form-description">
                              Use a permanent address where you can receive
                              mail.
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
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={(e) => setSelectedEditIndex(-1)} className="form-reset">
                              Cancel
                            </button>
                            <button type="submit" className="form-submit">
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : null}
                    <li key={index} className="address-item">
                      <div className="address-details">
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
                      <div className={AddAddressStyle.btnFlex}>
                        <button
                          onClick={(e) => handleEditForm(index)}
                          type="button"
                          className={AddAddressStyle.edit}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemove(index)}
                          type="button"
                          className={AddAddressStyle.remove}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAddress;
