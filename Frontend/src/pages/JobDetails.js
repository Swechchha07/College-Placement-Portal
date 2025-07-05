// src/pages/JobDetails.js
import React from "react";
import "../styles/JobDetails.css";
import { Link } from "react-router-dom";
import infosysLogo from "../assets/infosys_logo.jpg";
import bgImg from "../assets/photo-1486406146926-c627a92ad1ab.jpg";
import { useNavigate, useLocation } from "react-router-dom";


function JobDetails() {
  // ✅ Background image style object (must be defined before return)

  const navigate = useNavigate();
const { state } = useLocation();
const { company = "Infosys", role = "Software Engineer" } = state || {};

  const backgroundStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
  };

  // ✅ Optional overlay to darken the background for better readability
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
  };

  return (
    <>
      <header>
        <div className="logo">Placement Portal</div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/companies">Companies</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <section className="job-details" style={backgroundStyle}>
        <div style={overlayStyle}></div>

        <div className="container" style={contentStyle}>
          <div className="company-header">
            <img src={infosysLogo} alt="Infosys Logo" className="company-logo" />
            <h1>Software Engineer - Infosys</h1>
          </div>

          <div className="job-tags">
            <span className="tag">Location: Bangalore</span>
            <span className="tag">Full-Time</span>
            <span className="tag">On-site</span>
          </div>

          <p><strong>Application Deadline:</strong> June 30, 2025</p>
          <p><strong>Salary Package:</strong> ₹8 LPA</p>
          <p><strong>Recruiter:</strong> John Doe (HR, Infosys) | john.doe@infosys.com</p>

          <h3>About the Role</h3>
          <p>
            As a Software Engineer at Infosys, you will build scalable systems that drive innovation and impact millions of users worldwide.
          </p>

          <h3>Responsibilities</h3>
          <ul>
            <li>Develop and maintain enterprise-level applications.</li>
            <li>Collaborate with cross-functional teams using agile methodology.</li>
            <li>Contribute to code reviews, documentation, and design discussions.</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>B.Tech/M.Tech in CS/IT or equivalent</li>
            <li>Strong problem-solving and communication skills</li>
            <li>Good knowledge of data structures and algorithms</li>
          </ul>

          <h3>Skills Required</h3>
          <ul className="skills">
            <li>JavaScript</li>
            <li>Node.js</li>
            <li>React</li>
            <li>MongoDB</li>
          </ul>

          <button
  className="apply-btn"
  onClick={() =>
    navigate("/apply", {
      state: { company, role }
    })
  }
>
  Apply Now
</button>


          
        </div>
      </section>

      
    </>
  );
}

export default JobDetails;
