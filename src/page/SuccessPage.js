import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import axios from "axios";

function SuccessPage() {
        const { userId, fetchCartItems, setCurrentOrder } = useContext(UserContext);  

  useEffect(() => {
    const clearCartInDatabase = async () => {
      try {
        // const userId = 'your-user-id'; // Replace with actual user ID
       const response = await axios.delete(`http://localhost:3005/clear-cart/${userId}`);
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

  return (
    <>
     
      <div>Success</div>
      <Link to='/'>
        <h1>Click here to Go Home</h1>
      </Link>
    </>
  );
}

export default SuccessPage;
