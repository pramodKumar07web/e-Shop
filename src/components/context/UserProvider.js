import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);  // New state for total products

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [brands, setBrands] =useState([])
  const [orders, setOrders] = useState([]);
const [categories, setCategories] = useState([]);

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
        // console.log("response", response.data);
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
  }, [ userId]);

  const handleRemove = async (id) => {
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

    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3005/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

  const orderUpdate = async (updateOrder) => {
    try {
      const response = await axios.patch(`http://localhost:3005/updateOrder/${updateOrder._id}`, updateOrder);
      
      if (response && response.status === 200) {
        console.log("Order updated successfully", response.data);
        fetchOrders(); // Refresh the orders list after a successful update
      } else {
        console.error("Failed to update order", response);
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };
  

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


    useEffect(() => {
    // Fetch categories and brands on component mount
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get("http://localhost:3005/categories"),
          axios.get("http://localhost:3005/brands")
        ]);
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndBrands();
  }, []);



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
        handleRemove,
        fetchOrders,
        orders,
        orderUpdate,
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
        selectedCategories,
        setSelectedCategories,
        totalProducts, setTotalProducts,
        categories, setCategories,
        brands, setBrands,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
