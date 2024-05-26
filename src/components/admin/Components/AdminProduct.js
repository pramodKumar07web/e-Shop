import React, { useEffect, useState } from 'react'
import HomeStyle from "../home/Home.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AdminProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3005/product");
          setProducts(response.data.product);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>  <h2 className={HomeStyle.new}>New Arrivals</h2> <div className={HomeStyle.card_list}>
    {products && Array.isArray(products) ? (
      products.map((product) => (
        <Link
        to={`/product-details/${product._id}`}
        key={product._id}
      >
        <div className={HomeStyle.card}>
        <img
                  className={HomeStyle.img}
                  src={product.thumbnail}
                  alt=""
                />
                <h3>{product.title}</h3>
                {/* <p className={HomeStyle.p3}>Sony Camera</p> */}
                <p className={`${HomeStyle.p} ${HomeStyle.p3}`}>
                  Price: $<strike>{product.price}</strike>
                </p>
                <p className={HomeStyle.p}>
                  Discount : {product.discountPercentage}%
                </p>
                <p className={HomeStyle.p}>
                  Special Price : $
                  {Math.round(
                    product.price * (1 - product.discountPercentage / 100)
                  )}
                </p>
                <p className={HomeStyle.p}>Brand : {product.brand}</p>
                <p className={HomeStyle.p}>Category : {product.category}</p>
          <p className={HomeStyle.p}>Add on 5 minutes ago</p>

                <div className={HomeStyle.product}>
                  <p className={`${HomeStyle.p} ${HomeStyle.stock}`}>
                    Stock : {product.stock}
                  </p>
                  <p className={`${HomeStyle.p} ${HomeStyle.stock}`}>
                    Rating : {product.rating}
                  </p>
                  </div>
          
          {/* <p className={`${HomeStyle.p} ${HomeStyle.p3}`}>
            Price: {product.price}
          </p> */}
          
          {/* <p className={`${HomeStyle.p} ${HomeStyle.stock}`}>
            In Stock : {product.stock}
          </p> */}
          <div className={HomeStyle.product}>
            <p className={HomeStyle.view}>VIEW PRODUCT</p>
            <p className={HomeStyle.cart}>ADD TO CART</p>
          </div>
        </div>
        </Link>
      ))
    ) : (
      <p>No products available</p>
    )}

    {/* <div className={HomeStyle.card}>
      <img className={HomeStyle.img} src={c1} alt="" />
      <h3>Camera</h3>
      <p className={HomeStyle.p3}>Sony Camera</p>
      <p className={`${HomeStyle.p} ${HomeStyle.p3}`}>Price: $999</p>
      <p className={HomeStyle.p}>Category</p>
      <p className={HomeStyle.p}>Add on 5 minutes ago</p>
      <p className={`${HomeStyle.p} ${HomeStyle.stock}`}>In Stock</p>
      <div className={HomeStyle.product}>
        <p className={HomeStyle.view}>VIEW PRODUCT</p>
        <p className={HomeStyle.cart}>ADD TO CART</p>
      </div>
    </div>
    <div className={HomeStyle.card}>
      <img className={HomeStyle.img} src={m1} alt="" />
      <h3>Mobile</h3>
      <p className={HomeStyle.p3}>iPhone</p>
      <p className={`${HomeStyle.p} ${HomeStyle.p3}`}>Price: $999</p>
      <p className={HomeStyle.p}>Category</p>
      <p className={HomeStyle.p}>Add on 5 minutes ago</p>
      <p className={`${HomeStyle.p} ${HomeStyle.stock}`}>In Stock</p>
      <div className={HomeStyle.product}>
        <p className={HomeStyle.view}>VIEW PRODUCT</p>
        <p className={HomeStyle.cart}>ADD TO CART</p>
      </div>
    </div> */}
  </div></div>
  )
}
