import React, { useContext } from 'react'
import DashboardStyle from './Dashboard.module.css'
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

function Dashboard() {
  const {userInfo,userId} = useContext(UserContext)
  return (
    <>

    {/* <div className={DashboardStyle.home_page}>
      <h1>Dashboard User</h1>
      <p>WellCome to the world of fashion</p>
    </div> */}
    <div className={DashboardStyle.admin_container}>
        <div className={DashboardStyle.admin}>
          <p className={DashboardStyle.bold}>
            <b>User Links</b>
          </p>
          <div className={DashboardStyle.admin_links}>
          <Link to="/addAddress">
              <p className={DashboardStyle.links}>
                <span>MY Profile</span>
              </p>
            </Link>
            <Link to='/cart-page'>
              <p className={DashboardStyle.links}>
                <span>My Cart</span>
              </p>
            </Link>
            {/* <Link to='/profileUpdate'>
              <p className={DashboardStyle.links}>
                <span>Update Profile</span>
              </p>
            </Link> */}
            <Link to="/order-page">
              <p className={DashboardStyle.links}>
                <span>My Orders</span>
              </p>
            </Link>
          
           
          </div>
        </div>
       {userInfo && <div className={DashboardStyle.user}>
          <p className={DashboardStyle.bold}>
            <b>User Information</b>
          </p>
          <div className={DashboardStyle.admin_links}>
            <p className={DashboardStyle.links}>
              <span>{userInfo.name}</span>
            </p>

            <p className={DashboardStyle.links}>
              <span>{userInfo.email}</span>
            </p>

            <p className={DashboardStyle.links}>
              <span>{userId?"Registered user":"User Unregistered"}</span>s
            </p>
          </div>
          <p className={DashboardStyle.bold1}>
            <b>Purchase history</b>
          </p>
        </div>}
        <div></div>
      </div>
  
  </>
  )
}

export default Dashboard