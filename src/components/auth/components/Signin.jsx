import SignInStyle from "./SignIn.module.css";
import lockIcon from "../../../image/lockicon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

function Signin() {
  //login field require
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/login", data);
      if (response && response.data && response.data.token) {
        const { token, } = response.data;
        console.log('responseId',response.data.id);

        // Store the token and user in localStorage
        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));

        login(response.data.id)
        // setUserId(response.data.id)
        // setUser(user); // Update user context
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <>
      <div className={SignInStyle.home_page}>
        <h1>Sign In Page</h1>
        <p>WellCome to the world of fashion</p>
      </div>
      <div className={SignInStyle.login_container}>
        <div className={SignInStyle.lockIcon}>
          <img src={lockIcon} alt="" />
          <p>Sign In</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <input
                type="email"
                className={SignInStyle.email}
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={changeData}
              />
            </label>
            <br />
            <label htmlFor="">
              <input
                type="password"
                className={SignInStyle.email}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={changeData}
              />
            </label>

            <br />
            <label htmlFor="">
              <button className={SignInStyle.btn} type="submit">
                Sign In
              </button>
            </label>
          </form>
          <br />
        </div>
        <div style={{ marginLeft: "40px", marginTop: "15px" }}>
          <Link to="/SignUp">Don't have an account? Sign up</Link>
          <Link to="" style={{ textDecoration: "none", marginLeft: "5vw" }}>
            Forget Password?
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
