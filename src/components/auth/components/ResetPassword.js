import SignInStyle from "./SignIn.module.css";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    // console.log('Token from URL:', token);
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post(`/auth/reset-password/${token}`, {password});
      alert('Password has been reset.');
      navigate('/login');
    } catch (error) {
      alert('Something went wrong.');
    }
  };

  return (
    <>
      <div className={SignInStyle.login_container}>
        <div className={SignInStyle.lockIcon}>
          <h3>Enter New Password</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <input
                type="password"
                className={SignInStyle.email}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label htmlFor="">
              <button className={SignInStyle.btn} type="submit">
                Sign In
              </button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
