// src/pages/ApplyPage.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ApplyPage.css";
import bgImage from "../assets/06.jpg";

const ApplyPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { company = "Company", role = "Role" } = state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    resume: null,
    coverLetter: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phone, qualification, resume } = formData;

    if (!fullName || !email || !phone || !qualification || !resume) {
      setMessage("❗ Please fill all required fields.");
      return;
    }

    setTimeout(() => {
      setMessage("✅ Application submitted successfully!");
    }, 800);
  };

  // ✅ Background styles
  const containerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px"
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "600px"
  };

  return (
    <div className="apply-container" style={containerStyle}>
      <div style={overlayStyle}></div>

      <div className="apply-card" style={contentStyle}>
        <h2>
          Apply for <span>{role}</span> at <span>{company}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Qualification / Branch *</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />

          <label>Resume Upload *</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />

          <label>Cover Letter / Message</label>
          <textarea
            name="coverLetter"
            rows="4"
            value={formData.coverLetter}
            onChange={handleChange}
          />

          {message && (
            <p
              className={`message ${
                message.startsWith("✅") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
