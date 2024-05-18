import {useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export const UserProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userId, setUserId]= useState(null)
  const [userInfo, setUserInfo]= useState(null)
  const [cartItems, setCartItems] = useState([]);
  // const [cardLoaded, setCardLoaled] = useState(false)

  const login = (id) => {
    // Perform login actions and set isLoggedIn to true
    setIsLoggedIn(true);
    setUserId(id)
  };

  const logout = () => {
    // Perform logout actions and set isLoggedIn to false
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // useEffect(() => {
    // Call the backend API to Auth check
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:3005/users/own'
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
        if (response) {
          console.log('fetchLoggedInUser',response.data)
          // const data = await response.json();
          setUserInfo(response.data);
        } else {
          console.error("Failed to fetch UserId");
        }
      } catch (error) {
        console.error("Error fetching auth check:", error);
      }
    };

  //   fetchLoggedInUser();
  // }, []);


  useEffect(() => {
    // Call the backend API to Auth check
    const CheckUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/auth/check`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response) {
          // console.log('AuthCheck',response.data.id)
          // const data = await response.json();
          setUserId(response.data.id);
        } else {
          console.error("Failed to fetch UserId");
        }
      } catch (error) {
        console.error("Error fetching auth check:", error);
      }
    };

    CheckUser();
  }, []);


    // Call the backend API to get all cart items
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/cart/${userId}`);
        if (response) {
          console.log('response',response.data)
          // const data = await response.json();
          setCartItems(response.data);
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };


    useEffect(() => {
      if(userId){
        fetchCartItems();
        fetchLoggedInUser();
      }

  }, []);


  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      // Calculate the special price for each item
      const specialPrice = Math.round(item.product.price * (1 - item.product.discountPercentage / 100));
      // Add the special price multiplied by quantity to the total
      total += specialPrice * item.quantity;
    });
    return total;
  };  

  // Calculate total amount
  const totalAmount = getTotalAmount();

  return (
    <UserContext.Provider
      value={{isLoggedIn,userInfo, userId, cartItems, totalAmount, setCartItems, setUserId, login, logout}}
    >
        {children}
    </UserContext.Provider>
  );
};
