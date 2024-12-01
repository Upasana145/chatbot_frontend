import React, { useState } from "react";
import { postAPI } from "../utils/fetchapi";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendorLogin, setVendorLogin] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsNavigating(true);

    try {
      const payload = {
        username: vendorLogin,
        password: vendorPassword,
      };

      let data = await postAPI("auth/login", payload, null);
      if (data?.status) {
        dispatch(loginHandler(data));
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error?.message);
    } finally {
      setIsNavigating(false);
    }
  };


  return (
    <div className="signin-container">
      <div className="signin-left col-6">
        <div className="logo-link">
          <span className="logo-icon">🤖</span>
        </div>
        <h3 className="welcome-heading">Welcome Back</h3>
        <p className="chatbot-intro">
          Get Started by Signing In
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={vendorLogin}
            onChange={(e) => setVendorLogin(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={vendorPassword}
            onChange={(e) => setVendorPassword(e.target.value)}
            className="input-field"
            required
          />
          <div className="form-options">
          </div>
          <button type="submit" className="login-button" disabled={isNavigating}>
            {isNavigating ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="col-6">
        <div className="signin-right">
        </div>
      </div>
    </div>
  );
}

export default Signin;

