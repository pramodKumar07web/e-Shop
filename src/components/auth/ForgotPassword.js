import SignUpStyle from "./components/SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function ForgotPassword() {
  const [email, setEmail] = useState('');
  
    const signUpSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(
          "http://localhost:3005/auth/reset-password-request",
          { email }
        )
        alert('Password reset link sent to your email.');
      } catch (error) {
        alert('Something went wrong.');
      }
    };
  
    return (
      <>
        <div className={SignUpStyle.login_content}>
          <div className={SignUpStyle.login_container}>
            <div className={SignUpStyle.lockIcon}>
              <h3>Enter email to reset password</h3>
              <form onSubmit={signUpSubmit}>
                <label htmlFor="">
                  <input
                    type="email"
                    className={SignUpStyle.name}
                    name="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </label>
                <br />
                <label htmlFor="">
                  <button className={SignUpStyle.btn} type="submit">
                   Send to Email
                  </button>
                </label>
              </form>
              <br />
            </div>
            <div style={{ marginLeft: "15px", marginTop: "15px" }}>
            Already have an account? {" "}
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default ForgotPassword;