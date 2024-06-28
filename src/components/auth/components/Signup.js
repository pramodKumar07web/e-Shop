import SignUpStyle from "./SignUp.module.css";
import lockIcon from "../../../image/lockicon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SWal from "sweetalert2";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      //ApI Call
      // console.log("Before API Call");
      const response = await axios.post(
        "http://localhost:3005/auth/Signup",
        formData
      )
      // console.log("After API Call");
      if (response && response.data) {
        // const { token, } = response.data;
         // Store the token in localStorage
        //  localStorage.setItem('token ', token);

        SWal.fire({
          icon: "success",
          title: "SignUp Successfully",
          text: "Welcome Back",
        });
        navigate('/login')
        console.log("SignUp Successfully");
       } else {
        console.error("Invalid Response Data");
      }
    } catch (error) {
      console.error("error during signUp", error);
      if (error.response && error.response.data) {
        console.error("Error details ", error.response.data);
      } else {
        console.log("Unexpected Error");
      }
    }
  };

  return (
    <>
      {/* <div className={SignUpStyle.home_page}>
        <h1>SignUp Page</h1>
        <p>WellCome to the world of fashion</p>
      </div> */}
      <div className={SignUpStyle.login_content}>
        <div className={SignUpStyle.login_container}>
          <div className={SignUpStyle.lockIcon}>
            <img src={lockIcon} alt="" />
            <p>Sign up</p>
            <form onSubmit={signUpSubmit}>
              <label htmlFor="">
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
              <label htmlFor="">
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
              <label htmlFor="">
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
              <label htmlFor="">
                <input
                  type="text"
                  className={SignUpStyle.name}
                  name="bio"
                  placeholder="bio"
                  onChange={handleChange}
                  value={formData.bio}
                />
              </label>
              <label htmlFor="">
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
          <span>
            Copyright @ Shopify 2023{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default SignUp;
