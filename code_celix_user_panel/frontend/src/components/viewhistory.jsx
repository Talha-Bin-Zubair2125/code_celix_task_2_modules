import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Stylings/viewhistory.css";

function Viewhistory() {
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  // For Response
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        /*
            Authorization -- HTTP header name
            Bearer = type of authentication scheme where the token itself proves your identity.
        */
        const res = await axios.get("http://localhost:3000/view/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // For Debugging
        console.log(res.data);

        setComplaints(res.data.complaints);
        setFeedbacks(res.data.feedbacks);
      } catch (error) {
        console.error(error);
        setError("Failed to Load History");
      }
    };

    fetchData();
  }, []);

  const back_to_profile = () => {
    navigate("/userprofile");
  };

  if (error)
    return (
      <div className="vh-container vh-error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="vh-container">
      {/* Complaints Section */}
      <section className="vh-section">
        <h2>Complaints</h2>
        <div className="table-wrapper">
          <table className="vh-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Complaint</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((c, i) => (
                  <tr key={c._id}>
                    <td>{i + 1}</td>
                    <td>{c.complaint}</td>
                    <td>{c.category}</td>
                    <td>{c.status || ""}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No complaints found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="vh-section">
        <h2>Feedbacks</h2>
        <div className="table-wrapper">
          <table className="vh-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Feedback</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((f, i) => (
                  <tr key={f._id}>
                    <td>{i + 1}</td>
                    <td>{f.feedback}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No feedback found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <button type="button" className="back-btn" onClick={back_to_profile}>
        Back to Profile
      </button>
    </div>
  );
}

export default Viewhistory;
