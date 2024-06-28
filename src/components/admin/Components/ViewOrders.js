import React, { useContext, useEffect, useState } from "react";
import styles from "./ViewOrders.module.css";
import { EyeIcon, PencilIcon } from "@heroicons/react/16/solid";
import Navbar from '../../navbar/Navbar'
import UserContext from "../../context/UserContext";

const ViewOrders = () => {
  const {orderUpdate,orders, fetchOrders} = useContext(UserContext)
  const [editTableOrderId, setEditTableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditTableOrderId(order._id);
  };

  const handleShow = () => {
    console.log("handleShow");
  };


  const handleOrderStatus = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    // dispatch(updateOrderAsync(updateOrder));
    //  console.log("handleEdit",updateOrder._id);
    orderUpdate(updateOrder)
    setEditTableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updateOrder = { ...order, paymentStatus: e.target.value };
    // dispatch(updateOrderAsync(updateOrder));
    orderUpdate(updateOrder)
    setEditTableOrderId(-1);
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  // useEffect(() => {
  //   // Fetch orders from the API
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3005/orders");
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };
  //   fetchOrders();
  // }, []);


  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return `${styles.bgPurple200} ${styles.textPurple600}`;
      case "dispatched":
        return `${styles.bgYellow200} ${styles.textYellow600}`;
      case "delivered":
        return `${styles.bgGreen200} ${styles.textGreen600}`;
      case "received":
        return `${styles.bgGreen200} ${styles.textGreen600}`;
      case "cancelled":
        return `${styles.bgRed200} ${styles.textRed600}`;
      default:
        return `${styles.bgPurple200} ${styles.textPurple600}`;
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.overflowXAuto}>
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th
                className={styles.headerCell}
                // onClick={(e) =>
                //   handleSort({
                //     sort: "id",
                //     order: sort?._order === "asc" ? "desc" : "asc",
                //   })
                // }
              >
                Order# {"  "}
                {/* {sort._sort === "id" && sort._order === "asc" ? (
                  <ArrowUpIcon className={styles.headerIcon}></ArrowUpIcon>
                ) : (
                  <ArrowDownIcon className={styles.headerIcon}></ArrowDownIcon>
                )} */}
              </th>
              <th className={styles.headerCell}>Items</th>
              <th
                className={styles.headerCell}
                // onClick={(e) =>
                //   handleSort({
                //     sort: "totalAmount",
                //     order: sort?._order === "asc" ? "desc" : "asc",
                //   })
                // }
              >
                Total Amount 
                {/* {sort._sort === "totalAmount" && sort._order === "asc" ? (
                  <ArrowUpIcon className={styles.headerIcon}></ArrowUpIcon>
                ) : (
                  <ArrowDownIcon className={styles.headerIcon}></ArrowDownIcon>
                )} */}
              </th>
              <th className={styles.headerCell}>Shipping Address</th>
              <th className={styles.headerCell}>Order Status</th>
              <th className={styles.headerCell}>Payment Method</th>
              <th className={styles.headerCell}>Payment Status</th>
              <th
                className={styles.headerCell}
                // onClick={(e) =>
                //   handleSort({
                //     sort: "createdAt",
                //     order: sort?._order === "asc" ? "desc" : "asc",
                //   })
                // }
              >
                Order Time {"  "}
                {/* {sort._sort === "createdAt" && sort._order === "asc" ? (
                  <ArrowUpIcon className={styles.headerIcon}></ArrowUpIcon>
                ) : (
                  <ArrowDownIcon className={styles.headerIcon}></ArrowDownIcon>
                )} */}
              </th>

              <th
                className={styles.headerCell}
                // onClick={(e) =>
                //   handleSort({
                //     sort: "updatedAt",
                //     order: sort?._order === "asc" ? "desc" : "asc",
                //   })
                // }
              >
                Last Update {"  "}
                {/* {sort._sort === "updatedAt" && sort._order === "asc" ? (
                  <ArrowUpIcon className={styles.headerIcon}></ArrowUpIcon>
                ) : (
                  <ArrowDownIcon className={styles.headerIcon}></ArrowDownIcon>
                )} */}
              </th>
              <th className={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {orders.map((order) => (
              <tr className={styles.tableRow} key={order._id}>
                <td className={styles.cell}>
                  <div className={styles.itemContainer}>
                    <div className="mr-2"></div>
                    <span className="font-medium">{order._id}</span>
                  </div>
                </td>
                <td className={styles.cell}>
                  {order.items.map((item) => (
                    <div className={styles.itemContainer} key={item.product.id}>
                      <div className={styles.mr}>
                        <img
                          className={styles.itemImage}
                          src={item.product.thumbnail}
                          alt={item.product.title}
                        />
                      </div>
                      <span>
                        {item.product.title} - Qty:{item.quantity} - ${item.product.discountPrice}
                      </span>
                    </div>
                  ))}
                </td>
                <td className={styles.cellCenter}>
                  <div className="flex items-center justify-center">
                    ${order.totalAmount}
                  </div>
                </td>
                <td className={styles.cellCenter}>
                  <div>
                    {order.selectedAddress ? (
                      <>
                        <div>
                          <strong>{order.selectedAddress.name},</strong>
                        </div>
                        <div>{order.selectedAddress.email}, </div>
                        <div>{order.selectedAddress.street}, </div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone} </div>
                      </>
                    ) : (
                      <span>Address information not available</span>
                    )}
                  </div>
                </td>
                <td className={styles.cellCenter}>
                  {order._id === editTableOrderId ? (
                    <select onChange={(e) => handleOrderStatus(e, order)}>
                      <option value="pending">Pending</option>
                      <option value="pending">Pending</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`${styles.status} ${chooseColor(order.status)}`}>
                      {order.status}
                    </span>
                   )} 
                </td>
                <td className={styles.cellCenter}>
                  <div className="flex items-center justify-center">
                    {order.paymentMethod}
                  </div>
                </td>

                <td className={styles.cellCenter}>
                  {order._id === editTableOrderId ? (
                    <select onChange={(e) => handleOrderPaymentStatus(e, order)}>
                      <option value="pending">Pending</option>
                      <option value="pending">Pending</option>
                      <option value="received">Received</option>
                    </select>
                   ) : ( 
                    <span className={`${styles.status} ${chooseColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  )} 
                </td>
                <td className={styles.cellCenter}>
                  <div className="flex items-center justify-center">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
                  </div>
                </td>
                <td className={styles.cellCenter}>
                  <div className="flex items-center justify-center">
                    {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
                  </div>
                </td>
                <td className={styles.cellCenter}>
                  <div className={styles.actionsContainer}>
                    <div className={styles.actionIcon} onClick={(e) => handleShow(order)}>
                      <EyeIcon></EyeIcon>
                    </div>
                    <div className={styles.actionIcon} onClick={(e) => handleEdit(order)}>
                      <PencilIcon></PencilIcon>
                    </div>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div></>
  );
};

export default ViewOrders;
