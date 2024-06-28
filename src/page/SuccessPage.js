import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import axios from "axios";
import styles from './SuccessPage.module.css';

function SuccessPage() {
        const { userId, fetchCartItems, setCurrentOrder } = useContext(UserContext);
        const { id } = useParams();
        console.log('id',id)
        

  useEffect(() => {
    const clearCartInDatabase = async () => {
      try {
        // const userId = 'your-user-id'; // Replace with actual user ID
       const response = await axios.delete(`http://localhost:3005/cart/clearCart/${userId}`);
       if(response){
        fetchCartItems()
        setCurrentOrder(null)
       }// Clear the cart in context after successful database clearance
      } catch (error) {
        console.error('Error clearing cart in database:', error);
      }
    };

    clearCartInDatabase();
  }, [userId]);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/orders/successOrders/${id}`);
            if (response.data && response.data.length > 0) {
                // console.log("Fetched order data:", response.data[0]);
                setOrder(response.data[0]);
            } else {
                console.error("No response data found");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching order:", error);
            setLoading(false);
        }
    };

    fetchOrder();
}, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  console.log('orders',order)

  return (
    <>
     
     <div className={styles.container}>
            <div className={styles.successMessage}>
                <h1>Thank you for your purchase!</h1>
                <p>Your order has been placed successfully.</p>
            </div>
            <div className={styles.orderDetails}>
                <h2>Order Details</h2>
                <p>Order Number: #{id}</p>
                <p>Estimated Delivery: 5-7 business days</p>
                {/* Add more order details as necessary */}
            </div>
            <div className={styles.recommendedProducts}>
                <h2>You may also like</h2>
                <div className={styles.products}>
                {order.items && order.items.map((item, index) => (
                            <div className={styles.product} key={index}>
                                <img src={item.product.thumbnail} alt={item.product.title} />
                                <p>{item.product.title}</p>
                            </div>
                        ))}
                </div>
            </div>
            <Link to='/'>
        <h1>Click here to Go Home</h1>
      </Link>
        </div>
    
    </>
  );
}

export default SuccessPage;
