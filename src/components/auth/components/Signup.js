import SignUpStyle from "./SignUp.module.css";
import lockIcon from "../../../image/lockicon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";  // Changed from SWal to Swal for consistency

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    const { name, email, password, gender } = formData;
    if (!name || !email || !password || !gender) {
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

  const signUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;  // Added form validation before submission

    try {
      const response = await axios.post(
        "/auth/Signup",
        formData
      );
      if (response && response.data) {
        Swal.fire({
          icon: "success",
          title: "SignUp Successfully",
          text: "Welcome",
        });
        navigate('/login');
      } else {
        console.error("Invalid Response Data");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Improved error handling to provide user feedback
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: error.response && error.response.data ? error.response.data.message : "Unexpected Error",
      });
    }
  };

  return (
    <div className={SignUpStyle.login_content}>
      <div className={SignUpStyle.login_container}>
        <div className={SignUpStyle.lockIcon}>
          <img src={lockIcon} alt="Lock Icon" />
          <p>Sign up</p>
          <form onSubmit={signUpSubmit}>
            <label>
              <input
                type="text"
                className={SignUpStyle.name}
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.name}
              />
            </label>
            <br />
            <label>
              <input
                type="email"
                className={SignUpStyle.name}
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
              />
            </label>
            <br />
            <label>
              <input
                type="password"
                className={SignUpStyle.name}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                className={SignUpStyle.name}
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
                value={formData.gender}
              />
            </label>
            <label>
              <button className={SignUpStyle.btn} type="submit">
                Sign Up
              </button>
            </label>
          </form>
          <br />
        </div>
        <div style={{ marginLeft: "15px", marginTop: "15px" }}>
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </div>
      <div className={SignUpStyle.copyright}>
        <span>Copyright @ Shopify 2023</span>
      </div>
    </div>
  );
}

export default SignUp;
