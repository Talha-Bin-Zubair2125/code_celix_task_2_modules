import React from "react";
import { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";

function Register() {
  // States
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // useNavigate hook provides us a function and we have to store the function in a var to navigate us where we want
  const navigate = useNavigate();

  let submitdata = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    setErrorMsg("");

    if (password.length < 8) {
      setErrorMsg("Password Must Be At Least 8 Characters");
      return;
    }

    let data_to_backend = {
      fullname,
      email,
      password,
    };

    try {
      let res = await axios.post(
        "http://localhost:3000/auth/registeruser",
        data_to_backend
      );
      setResponseMsg("Sign Up successful");
      navigate("/");

    } catch (error) {
      // Optional Chaining -- if this exists then do this
      const backendMsg = error.response?.data?.message;

      // Check if the backend says email already exists
      if (backendMsg?.toLowerCase().includes("email")) {
        setErrorMsg("Email already exists. Please login or use another email.");
      } else {
        setErrorMsg(backendMsg || "Sign Up failed");
      }
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
            <h2>Sign Up</h2>
            <form onSubmit={submitdata}>
              <input
                placeholder="Username"
                value={fullname}
                required
                onChange={(e) => setfullname(e.target.value)}
              />
              <input
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                // Use an existing email -- browsers autofill the last stored email
                autoComplete="current-email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                // Use an existing password -- browsers autofill the last stored password
                autoComplete="current-password"
              />

              <button>Register</button>
              <Link to="/">Already Have an Account?</Link>
            </form>

            {responseMsg && <p className="success">{responseMsg}</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
