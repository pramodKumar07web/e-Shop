// OrderShowPage.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import UserOrdersStyle from "./UserOrders.module.css";

const UserOrders = () => {
  const { userInfo } = useContext(UserContext);
  //  console.log("userInfoId",userInfo.id);
  // const [order, setOrder] = useState({});
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `/orders/userOrder/${userInfo.id}`
        );
        if (response) {
          console.log("responseOrders", response);
        }
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orders) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <h1>My Orders</h1>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div className={UserOrdersStyle.container}>
              <div className={UserOrdersStyle.border}>
                <h1 className={UserOrdersStyle.heading}>Order # {order._id}</h1>
                <h3 className={UserOrdersStyle.subHeading}>
                  Order Status : {order.status}
                </h3>
                <div className={UserOrdersStyle.flowRoot}>
                  <ul className={UserOrdersStyle.list}>
                    {order.items.map((item) => (
                      <li key={item.id} className={UserOrdersStyle.listItem}>
                        <div className={UserOrdersStyle.imageContainer}>
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className={UserOrdersStyle.image}
                          />
                        </div>
                        <div className={UserOrdersStyle.itemDetails}>
                          <div>
                            <div className={UserOrdersStyle.itemHeader}>
                              <h3>
                                <a href={item.product.id}>
                                  {item.product.title}
                                </a>
                              </h3>
                              <p className={UserOrdersStyle.itemPrice}>
                                $
                                {Math.round(
                                  item.product.price *
                                    (1 - item.product.discountPercentage / 100)
                                )}
                              </p>
                            </div>
                            <p className={UserOrdersStyle.itemBrand}>
                              {item.product.brand}
                            </p>
                          </div>
                          <div className={UserOrdersStyle.itemFooter}>
                            <div className={UserOrdersStyle.quantity}>
                              <label
                                htmlFor="quantity"
                                className={UserOrdersStyle.quantityLabel}
                              >
                                Qty : {item.quantity}
                              </label>
                            </div>
                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={UserOrdersStyle.border}>
                <div className={UserOrdersStyle.subtotal}>
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className={UserOrdersStyle.totalItems}>
                  <p>Total Items Orders</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className={UserOrdersStyle.shippingAddress}>
                  Shipping Address :
                </p>
                {order.selectedAddress && (
                  <div className={UserOrdersStyle.addressDetails}>
                    <div className={UserOrdersStyle.addressLeft}>
                      <p className={UserOrdersStyle.addressName}>
                        {order.selectedAddress.name}
                      </p>
                      <p className={UserOrdersStyle.addressStreet}>
                        {order.selectedAddress.street}
                      </p>
                      <p className={UserOrdersStyle.addressCity}>
                        {order.selectedAddress.city}
                      </p>
                    </div>
                    <div className={UserOrdersStyle.addressRight}>
                      <p className={UserOrdersStyle.addressPinCode}>
                        {order.selectedAddress.pinCode}
                      </p>
                      <p className={UserOrdersStyle.addressState}>
                        {order.selectedAddress.state}
                      </p>
                      <p className={UserOrdersStyle.addressPhone}>
                        Phone : {order.selectedAddress.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserOrders;
