import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdminStyle from "./Admin.module.css";
import UserContext from "../context/UserContext";

const Admin = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <>
     
      <div className={AdminStyle.home_page}>
          <h1>Dashboard Admin</h1>
          <p>WellCome to the world of fashion</p>
        </div>
      <div className={AdminStyle.admin_container}>
        <div className={AdminStyle.admin}>
          <p className={AdminStyle.bold}>
            <b>Admin Links</b>
          </p>
          <div className={AdminStyle.admin_links}>
         
            <Link>
              <p className={AdminStyle.links}>
                <span>Create Category</span>
              </p>
            </Link>
            <Link>
              <p className={AdminStyle.links}>
                <span>View Order</span>s
              </p>
            </Link>
            <Link to="/admin">
              <p className={AdminStyle.links}>
                <span>Manage Products</span>
              </p>
            </Link>
          </div>
        </div>
        <div className={AdminStyle.user}>
          <p className={AdminStyle.bold}>
            <b>User Information</b>
          </p>
          <div className={AdminStyle.admin_links}>
            <p className={AdminStyle.links}>
              <span>{userInfo.name}</span>
            </p>

            <p className={AdminStyle.links}>
              <span>{userInfo.email}</span>
            </p>

            <p className={AdminStyle.links}>
              <span>{userInfo.role}</span>
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Admin;
