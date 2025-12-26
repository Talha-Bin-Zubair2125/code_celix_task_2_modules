import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Stylings/Complaint.css";

function Complaint() {
  // States
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [complaint, setcomplaint] = useState("");
  const [category, setcategpry] = useState("");
  const [Priority, setPriority] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const SubmitComplaint = async (e) => {
    e.preventDefault();

    setResponseMsg("");
    setErrorMsg("");

    let data_to_backend = {
      name,
      email,
      complaint,
      category,
      Priority,
    };

    setname("");
    setemail("");
    setcomplaint("");
    setcategpry("");
    setPriority("");

    try {
      const res = await axios.post(
        "http://localhost:3000/complaint/submitcomplaint",
        data_to_backend
      );
      setResponseMsg(res.data?.message || "Complaint Submitted Successfully");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to Submit Complaint"
      );
    }
  };

  const back_to_profile = () => {
    navigate("/userprofile");
  };

  return (
    <>
      <form className="complaint-form" onSubmit={SubmitComplaint}>
        <h2>Submit Complaint</h2>
        {/* Response Messages */}
        {responseMsg && <p className="success-msg">{responseMsg}</p>}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <div className="form-section">
          {/* Fields for Name and Email */}
          <div className="row">
            {/* For Name */}
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              required
              onChange={(e) => setname(e.target.value)}
            />

            {/* For Email */}
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Fields for Submitting Complaint and Category Selection and Priority Selection */}
          <div className="row column">
            <div>
              <label>
                Enter Your Complaint
                <textarea
                  rows={6}
                  value={complaint}
                  required
                  onChange={(e) => setcomplaint(e.target.value)}
                ></textarea>
              </label>

              {/* Category Selection */}
              <label>
                Enter Complaint Category
                <select
                  value={category}
                  required
                  onChange={(e) => setcategpry(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Service">Service</option>
                  <option value="Technical">Technical</option>
                  <option value="Staff">Staff</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </label>

              {/* Priority Selection*/}
              <label>
                Enter Complaint Priority
                <select
                  value={Priority}
                  required
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Submit Complaint
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={back_to_profile}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Complaint;
