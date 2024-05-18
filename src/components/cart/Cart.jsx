import React, { useContext, } from "react";
import CartStyle from "./Cart.module.css";
import { Link } from "react-router-dom";
// import visa from "../../image/visa.png";
// import mastercard from "../../image/mastercard.svg";
// import amex from "../../image/amex.png";
// import jcb from "../../image/jcb.png";
// import discover from "../../image/discover.png";
import axios from "axios";
import UserContext from "../context/UserContext";


function Cart() {
  const {totalAmount,cartItems,setCartItems  } = useContext(UserContext);
  // const [cartItems, setCartItems] = useState([]);
  console.log('responseCartItems',cartItems)
  // useEffect(() => {
  //   // Call the backend API to get all cart items
  //   const fetchCartItems = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3005/api/cart/${userId}`);
  //       if (response) {
  //         console.log('response',response.data)
  //         // const data = await response.json();
  //         setCartItems(response.data);
  //       } else {
  //         console.error("Failed to fetch cart items");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);

  // console.log('cartItems',cartItems)

  const handleRemove = async (e,id) => {

    try {
      // Make a request to remove the item from the cart based on its id
     const response =  await axios.delete(`http://localhost:3005/api/cart/${id}`);
      // Update the cart items after successful removal
      if(response){
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      }
      
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  // const getTotalAmount = () => {
  //   let total = 0;
  //   cartItems.forEach(item => {
  //     // Calculate the special price for each item
  //     const specialPrice = Math.round(item.product.price * (1 - item.product.discountPercentage / 100));
  //     // Add the special price multiplied by quantity to the total
  //     total += specialPrice * item.quantity;
  //   });
  //   return total;
  // };

  // // Calculate total amount
  // const totalAmount = getTotalAmount();


// makePayment integration

  return (
    <>
      <div className={CartStyle.home_page}>
        <h1>Cart Page</h1>
        <p>WellCome to the world of fashion</p>
      </div>
      <div>
        <div className={CartStyle.cards_container}>
          <div className={CartStyle.items}>
            <h3 className={CartStyle.details}>Products Details</h3>
            {cartItems &&
              cartItems.map((item) => (
                <div className={CartStyle.cards1}>
                  <img
                    className={CartStyle.img1}
                    src={item.product.thumbnail}
                    alt=""
                  />
                  <h3>{item.product.title}</h3>
                  <p className={CartStyle.p3}>{item.product.brand}</p>
                  <p className={`${CartStyle.p} ${CartStyle.p3}`}>
                    Price: $<strike>{item.product.price}</strike>
                  </p>
                  <p className={CartStyle.p}>
                    {" "}
                    Special Price : $
                    {Math.round(
                      item.product.price *
                        (1 - item.product.discountPercentage / 100)
                    )}
                  </p>
                  <p className={CartStyle.p}>Qty : {item.quantity}</p>
                  <p className={`${CartStyle.p} ${CartStyle.stock}`}>
                    In Stock : {item.product.stock}
                  </p>
                  <div className={CartStyle.product}>
                  <Link
                    to={`/product-details/${item._id}`}
                    key={item._id}
                  >
                    <p className={CartStyle.view}>VIEW PRODUCT</p>
                    </Link>
                    <button type="submit" onClick={(e)=>handleRemove(e,item._id)} className={CartStyle.cart}>REMOVE PRODUCT</button>
                  </div>
                </div>
              ))}
          <p>Total Amount: ${totalAmount}</p>
          <div><Link to='/checkout'><button className={CartStyle.btn}>Checkout</button></Link></div>
          </div>



          {/* <div className={CartStyle.cards2}>
            <h3 className={CartStyle.details}>Your Cart Summary</h3>
            <h3>Total: $869</h3>
            <label htmlFor="" className={CartStyle.delivery}>
              Delivery Address:
            </label>
            <br />
            <label htmlFor="">
              <input
                type="text"
                name="address"
                className={CartStyle.address}
                placeholder="Type your delivery address here..."
              />
            </label>

            <div className={CartStyle.payment}>
              <div className={CartStyle.debit_card}>
                <div className={CartStyle.icon_debit}>
                  <i class="fa-solid fa-credit-card"></i>
                  <p>Pay with card</p>
                </div>
                <img className={CartStyle.card_img} src={visa} alt="#" />
                <img className={CartStyle.card_img} src={mastercard} alt="#" />
                <img className={CartStyle.card_img} src={amex} alt="#" />
                <img className={CartStyle.card_img} src={jcb} alt="#" />
                <img className={CartStyle.card_img} src={discover} alt="#" />
              </div>
              <div>
                <label htmlFor="" className={CartStyle.card_number}>
                  Card Number:
                </label>
                <br />
                <label htmlFor="">
                  <input
                    type="number"
                    name="number"
                    className={CartStyle.number}
                    placeholder="  **** **** **** **** "
                  />
                </label>
                <br />
                <label htmlFor="" className={CartStyle.card_number}>
                  Expiration Date <span>(MM/YY)</span>
                </label>
                <br />
                <label htmlFor="">
                  <input
                    type="number"
                    name="number"
                    className={CartStyle.number}
                    placeholder="  MM/YY "
                  />
                </label>
                <br />
              </div>
            </div>
            <div className={CartStyle.another_pay}>
              <Link to="/">Choose another way to pay</Link>
              <br />
              <button className={CartStyle.btn}>Pay</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Cart;
