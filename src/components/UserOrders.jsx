// OrderShowPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${match.params.id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container">
      <h1>Order Details</h1>
      <div className="order-details">
        <p>ID: {order.id}</p>
        <p>Customer: {order.customer}</p>
        <p>Product: {order.product}</p>
        <p>Quantity: {order.quantity}</p>
      </div>
    </div>
  );
  
};

export default UserOrders;
