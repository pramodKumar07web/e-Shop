import React from 'react'
import DashboardStyle from './Dashboard.module.css'
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>

    <div className={DashboardStyle.home_page}>
      <h1>Dashboard User</h1>
      <p>WellCome to the world of fashion</p>
    </div>
    <div className={DashboardStyle.admin_container}>
        <div className={DashboardStyle.admin}>
          <p className={DashboardStyle.bold}>
            <b>User Links</b>
          </p>
          <div className={DashboardStyle.admin_links}>
         
            <Link to='/cart-page'>
              <p className={DashboardStyle.links}>
                <span>My Cart</span>
              </p>
            </Link>
            <Link>
              <p className={DashboardStyle.links}>
                <span>Update Profile</span>
              </p>
            </Link>
           
          </div>
        </div>
        <div className={DashboardStyle.user}>
          <p className={DashboardStyle.bold}>
            <b>User Information</b>
          </p>
          <div className={DashboardStyle.admin_links}>
            <p className={DashboardStyle.links}>
              <span>Pramod Kumar</span>
            </p>

            <p className={DashboardStyle.links}>
              <span>pramod123@gmail.com</span>
            </p>

            <p className={DashboardStyle.links}>
              <span>Registered user</span>s
            </p>
          </div>
          <p className={DashboardStyle.bold1}>
            <b>Purchase history</b>
          </p>
        </div>
        <div></div>
      </div>
  
  </>
  )
}

export default Dashboard