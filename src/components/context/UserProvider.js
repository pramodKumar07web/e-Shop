import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const [uniqueBrands, setUniqueBrands] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  // const [cardLoaded, setCardLoaled] = useState(false)

  const login = (id) => {
    // Perform login actions and set isLoggedIn to true
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(null);
    setUserInfo(null);
    setCartItems([]);
  };

  // Call the backend API to Auth check
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get("http://localhost:3005/users/own", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        // console.log("fetchLoggedInUser", response.data);
        setUserInfo(response.data);
      } else {
        console.error("Failed to fetch UserId");
      }
    } catch (error) {
      console.error("Error fetching auth check:", error);
    }
  };

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
      const response = await axios.get(
        `http://localhost:3005/api/cart/${userId}`
      );
      if (response) {
        console.log("response", response.data);
        setCartItems(response.data);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLoggedInUser();
      fetchCartItems();
    }
  }, [userId]);

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      // Calculate the special price for each item
      const specialPrice = Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      );
      // Add the special price multiplied by quantity to the total
      total += specialPrice * item.quantity;
    });
    return total;
  };

  // Calculate total amount
  const totalAmount = getTotalAmount();
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const isBrandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const isPriceInRange =
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice);

    return isCategoryMatch && isBrandMatch && isPriceInRange;
  });

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        userId,
        cartItems,
        totalAmount,
        totalItems,
        currentOrder,
        filteredProducts,
        setCurrentOrder,
        setCartItems,
        setUserId,
        login,
        logout,
        fetchCartItems,
        fetchLoggedInUser,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
        selectedBrands,
        setSelectedBrands,
        products,
        setProducts,
        uniqueCategories,
        setUniqueCategories,
        uniqueBrands,
        setUniqueBrands,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
