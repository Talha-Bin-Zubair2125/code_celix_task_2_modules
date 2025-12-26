import React from "react";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Userprofile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // if we don't use and do all the code in component body then it provides us inappropriate results like run of every render and we can't use async code directly because react code is based on sync (React calls your component function, computes the JSX, and returns it immediately. Nothing inside the render should wait for asynchronous tasks like API calls or timers.)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT token from localStorage
        if (!token) {
          setError("No token found. Please login first.");
          return;
        }

        /*
        The second argument of axios.get() is the config object, and
        headers is a property inside the axios config.
        */
        const res = await axios.get("http://localhost:3000/auth/profile", {
          headers: { Authorization: token }, // headers is a property of the Axios config object used to send additional information (like JWT tokens) with HTTP requests.
        });

        setUser(res.data);
        setResponseMsg("Profile loaded successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []); // empty dependency array → run once on component mount

  const handleSignOut = () => {
    localStorage.removeItem("token");
    // Navigate to login page
    navigate("/");
  };

  return (
    <div className="profile-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/complaint" className="nav-link">
            Submit Complaint
          </Link>
          <Link to="/feedback" className="nav-link">
            Submit Feedback
          </Link>
        </div>
        <div className="nav-right">
          {user && (
            <div className="dropdown">
              <span
                className="dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.fullname} ▼
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* User Data */}
      <h2>User Profile</h2>

      {responseMsg && <p className="success-msg">{responseMsg}</p>}
      {error && <p className="error-msg">{error}</p>}

      {user ? (
        <div className="profile-card">
          <p>
            <strong>Username:</strong> {user.fullname}
          </p>
        </div>
      ) : (
        !error && <p className="loading-text">Loading profile...</p>
      )}
    </div>
  );
}

export default Userprofile;
