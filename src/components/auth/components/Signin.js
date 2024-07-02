import SignInStyle from "./SignIn.module.css";
import lockIcon from "../../../image/lockicon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../context/UserContext";

function Signin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const changeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const { email, password } = data;
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required",
      });
      return false;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid email format",
      });
      return false;
    }
    if (!validatePassword(password)) {
      Swal.fire({
        icon: "warning",
        title: "Password must be at least 8 characters long, include at least one letter, one number, and one special character",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3005/auth/login", data);
      if (response && response.data && response.data.token) {
        const { token, id } = response.data;
        console.log('responseId', id);

        // Store the token in localStorage
        localStorage.setItem("token", token);
        Swal.fire({
          icon: "success",
          title: "SignIn Successfully",
          text: "Welcome Back",
        });

        login(id);
        navigate("/"); // Redirect to home page
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Error during login", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response && error.response.data ? error.response.data.message : "Unexpected Error",
      });
    }
  };

  return (
    <>
      <div className={SignInStyle.login_container}>
        <div className={SignInStyle.lockIcon}>
          <img src={lockIcon} alt="Lock Icon" />
          <p>Sign In</p>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="email"
                className={SignInStyle.email}
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={changeData}
              />
            </label>
            <label>
              <input
                type="password"
                className={SignInStyle.email}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={changeData}
              />
            </label>
            <label>
              <button className={SignInStyle.btn} type="submit">
                Sign In
              </button>
            </label>
          </form>
          <br />
        </div>
        <div>
          <Link to="/SignUp">Don't have an account? Sign up</Link>
          <Link to="/forgot-password" style={{ textDecoration: "none", marginLeft: "3vw" }}>
            Forget Password?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
