import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  let submitdata = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    setErrorMsg("");

    let data_to_backend = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login_user",
        data_to_backend
      );
      // This Stores the Token that is received from backend for the verification of user
      localStorage.setItem("token", res.data.token);
      setResponseMsg("Login successful");
      navigate("/userprofile");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Smart Complaint Management System</h1>
          <p>
            An automated system for efficient digital submission and tracking of
            complaints.
          </p>
        </div>
        <div className="auth-right">
          <div className="container">
            <h2>Login</h2>
            <form onSubmit={submitdata}>
              <input
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button>Login</button>
              <Link to="/register">New here? Sign up now!</Link>
            </form>

            {responseMsg && <p className="success">{responseMsg}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
