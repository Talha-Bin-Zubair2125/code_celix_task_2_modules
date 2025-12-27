import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Stylings/Feedback.css";

function Feedback() {
  // States
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [feedback, setfeedback] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  let submit_feedback = async (e) => {
    e.preventDefault();

    setResponseMsg("");
    setErrorMsg("");

    let data_to_backend = {
      name,
      email,
      feedback,
    };

    setname("");
    setemail("");
    setfeedback("");

    try {
      const res = await axios.post(
        "http://localhost:3000/feedback/submitfeedback",
        data_to_backend
      );
      setResponseMsg(res.data?.message || "Feedback Submitted Successfully");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to Submit Feedback");
    }
  };

  const back_to_profile = () => {
    navigate("/userprofile");
  };

  return (
    <>
      {/* Fields for Name,Email and Feedback */}
      <form className="feedback-form" onSubmit={submit_feedback}>
        <div className="feedback-card">
          <h2>Submit Feedback</h2>

          {/* Response Messages */}
          {responseMsg && <p className="success-msg">{responseMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          {/* Name & Email */}
          <div className="row">
            {/* Name */}
            <input
              type="text"
              required
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Feedback */}
          <div className="form-group">
            <label>Enter Your Feedback</label>
            <textarea
              rows={6}
              value={feedback}
              onChange={(e) => setfeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Button Group */}
          <div className="button-group">
            {/* Submit Btn */}
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>

            {/* Back to Profile Btn */}
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

export default Feedback;
