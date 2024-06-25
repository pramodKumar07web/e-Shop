import { useContext } from 'react';
import NavbarStyle from './Navbar.module.css'
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

function Navbar (){
  const {userId, userInfo} = useContext(UserContext)
    return(
        <>
        <nav className={NavbarStyle.Nav}>
        <div className={NavbarStyle.nav_container}>
          <div className={NavbarStyle.logo_section}>
            <p className={NavbarStyle.company_name}>e-Shop</p>
          </div>
          <div className={NavbarStyle.Navbar}>
          <Link to="/" className={NavbarStyle.li}>
              <i class="fa-solid fa-house"></i> Home
            </Link>
          
            <Link to="/dashboard-page" className={NavbarStyle.li}>
            <i class="fa-solid fa-gauge"></i> Dashboard
            </Link>
            <Link to="/cart-page" className={NavbarStyle.li}>
            <i class="fa-solid fa-cart-shopping"></i> Cart
            </Link>
          {!userId ? <Link to="/login" className={NavbarStyle.li}>
            <i class="fa-solid fa-user"></i>  Signin
            </Link>:null}
           
            {!userId ?  <Link to="/SignUp" className={NavbarStyle.li}>
            <i class="fa-solid fa-user-plus"></i>   Signup
            </Link>:null}
            <Link to="/logout" className={NavbarStyle.li}>
            <i class="fa-solid fa-user-plus"></i>   Logout
            </Link>
           {userInfo && userInfo.role === 'admin' && <Link to="/admin-page" className={NavbarStyle.li}>
            <i class="fa-solid fa-user-plus"></i>   Admin
            </Link>}
          </div>
        </div>
       
      </nav>
        </>
    )
}

export default Navbar