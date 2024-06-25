import React, { useContext, useEffect, useState } from "react";
import AddAddressStyle from './AddAddress.module.css'
import UserContext from "../context/UserContext";
import axios from "axios";
import Navbar from "../navbar/Navbar";

function AddAddress() {
  const {
    userInfo,
    fetchLoggedInUser,
  } = useContext(UserContext);
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
  };

  const handleRemove = async (index) => {
    try {
      let updatedAddresses = userInfo.addresses.filter((_, i) => i !== index);
  
      const response = await axios.post(`http://localhost:3005/updateUser/${userInfo.id}`, {
        addresses: updatedAddresses,
      });
  
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
      <h2 className={AddAddressStyle.heading}>My Profile</h2>
      <div className={AddAddressStyle.container}>
        <div className={AddAddressStyle.content}>
          {userInfo &&
            <div className={AddAddressStyle.userInfo}>
              <h1 className={AddAddressStyle.userName}>
                Name: {userInfo.name ? userInfo.name : "New User"}
              </h1>
              <h3 className={AddAddressStyle.userEmail}>
                Email Address: {userInfo.email}
              </h3>
              {userInfo.role === "admin" && (
                <h3 className={AddAddressStyle.userRole}>
                  Role: {userInfo.role}
                </h3>
              )}
            </div>
          }
          <button className={AddAddressStyle.addBtn}
            onClick={() => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
          >
            Add New Address
          </button>
          {showAddAddressForm && (
            <form className={AddAddressStyle.customForm} noValidate onSubmit={handleSubmit}>
              <div className={AddAddressStyle.spaceY12}>
                <div className={AddAddressStyle.borderB}>
                  <h2 className={AddAddressStyle.formHeading}>Personal Information</h2>
                  <p className={AddAddressStyle.formDescription}>
                    Use a permanent address where you can receive mail.
                  </p>
                  <div className={AddAddressStyle.formGrid}>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="name" className={AddAddressStyle.formLabel}>
                        First name
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={changeData}
                          id="name"
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="email" className={AddAddressStyle.formLabel}>
                        Email address
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={changeData}
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="phone" className={AddAddressStyle.formLabel}>
                        Phone
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="phone"
                          name="phone"
                          value={data.phone}
                          onChange={changeData}
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={`${AddAddressStyle.formColumn} ${AddAddressStyle.formColumnFull}`}>
                      <label htmlFor="street" className={AddAddressStyle.formLabel}>
                        Street address
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="text"
                          name="street"
                          value={data.street}
                          onChange={changeData}
                          id="street"
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="city" className={AddAddressStyle.formLabel}>
                        City
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="text"
                          name="city"
                          value={data.city}
                          onChange={changeData}
                          id="city"
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="state" className={AddAddressStyle.formLabel}>
                        State / Province
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="text"
                          name="state"
                          value={data.state}
                          onChange={changeData}
                          id="state"
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                    <div className={AddAddressStyle.formColumn}>
                      <label htmlFor="pinCode" className={AddAddressStyle.formLabel}>
                        ZIP / Postal code
                      </label>
                      <div className={AddAddressStyle.formInput}>
                        <input
                          type="text"
                          name="pinCode"
                          value={data.pinCode}
                          onChange={changeData}
                          id="pinCode"
                          className={AddAddressStyle.formField}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={AddAddressStyle.flexItems}>
                  <button type="button" className={AddAddressStyle.formReset} onClick={() => setShowAddAddressForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={AddAddressStyle.formSubmit}>
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          )}
          {userInfo && userInfo.addresses && (
            <div>
              <div className={AddAddressStyle.addressContainer}>
                <ul className={AddAddressStyle.addressList}>
                  <p className={AddAddressStyle.addressTitle}>Your Addresses :</p>
                  {userInfo.addresses.map((address, index) => (
                    <div key={index}>
                      {selectedEditIndex === index ? (
                        <form className={AddAddressStyle.customForm} noValidate onSubmit={handleSubmitEdit}>
                          <div className={AddAddressStyle.spaceY12}>
                            <div className={AddAddressStyle.borderB}>
                              <h2 className={AddAddressStyle.formHeading}>Personal Information</h2>
                              <p className={AddAddressStyle.formDescription}>
                                Use a permanent address where you can receive mail.
                              </p>
                              <div className={AddAddressStyle.formGrid}>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="name" className={AddAddressStyle.formLabel}>
                                    First name
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="text"
                                      name="name"
                                      value={data.name}
                                      onChange={changeData}
                                      id="name"
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="email" className={AddAddressStyle.formLabel}>
                                    Email address
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      value={data.email}
                                      onChange={changeData}
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="phone" className={AddAddressStyle.formLabel}>
                                    Phone
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="phone"
                                      name="phone"
                                      value={data.phone}
                                      onChange={changeData}
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={`${AddAddressStyle.formColumn} ${AddAddressStyle.formColumnFull}`}>
                                  <label htmlFor="street" className={AddAddressStyle.formLabel}>
                                    Street address
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="text"
                                      name="street"
                                      value={data.street}
                                      onChange={changeData}
                                      id="street"
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="city" className={AddAddressStyle.formLabel}>
                                    City
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="text"
                                      name="city"
                                      value={data.city}
                                      onChange={changeData}
                                      id="city"
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="state" className={AddAddressStyle.formLabel}>
                                    State / Province
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="text"
                                      name="state"
                                      value={data.state}
                                      onChange={changeData}
                                      id="state"
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className={AddAddressStyle.formColumn}>
                                  <label htmlFor="pinCode" className={AddAddressStyle.formLabel}>
                                    ZIP / Postal code
                                  </label>
                                  <div className={AddAddressStyle.formInput}>
                                    <input
                                      type="text"
                                      name="pinCode"
                                      value={data.pinCode}
                                      onChange={changeData}
                                      id="pinCode"
                                      className={AddAddressStyle.formField}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={AddAddressStyle.flexItems}>
                              <button type="button" onClick={() => setSelectedEditIndex(-1)} className={AddAddressStyle.formReset}>
                                Cancel
                              </button>
                              <button type="submit" className={AddAddressStyle.formSubmit}>
                                Edit Address
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : null}
                      <li className={AddAddressStyle.addressItem}>
                        <div className={AddAddressStyle.addressDetails}>
                          <div>
                            <p className={AddAddressStyle.addressName}>{address.name}</p>
                            <p className={AddAddressStyle.addressStreet}>{address.street}</p>
                            <p className={AddAddressStyle.addressCity}>{address.city}</p>
                          </div>
                        </div>
                        <div className={AddAddressStyle.addressInfo}>
                          <p className={AddAddressStyle.addressPin}>{address.pinCode}</p>
                          <p className={AddAddressStyle.addressState}>{address.state}</p>
                          <p className={AddAddressStyle.addressPhone}>Phone : {address.phone}</p>
                        </div>
                        <div className={AddAddressStyle.btnFlex}>
                          <button
                            onClick={() => handleEditForm(index)}
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
          )}
        </div>
      </div>
    </>
  );
}

export default AddAddress;
