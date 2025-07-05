import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";
import heroImg from "../assets/1663131815phpZ3WZxB.jpg";
import jobData from "../data/jobData";


const Home = () => {
  const navigate = useNavigate();



  const heroStyle = {
    backgroundImage: `url(${heroImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backgroundBlendMode: "darken",
    padding: "100px 20px",
    textAlign: "center",
    color: "#fff",
    width: "100%",    
  minHeight: "50vh"
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

      <section className="hero" style={heroStyle}>
        <h1>Welcome to the GLA University Placement Portal</h1>
        <p>Connecting students with opportunities</p>
      </section>

     <section className="jobs">
  <h2>Latest Job Opportunities</h2>
  <div className="job-listing">
    {jobData.map((companyData, companyIndex) =>
      companyData.roles.map((role, roleIndex) => (
        <div className="job-card" key={`${companyIndex}-${roleIndex}`}>
          <h3>{role} - {companyData.company}</h3>
          <p>Deadline: July {10 + companyIndex + roleIndex}, 2025</p>
          <button onClick={() => navigate("/job-details")}>View & Apply</button>
        </div>
      ))
    )}
  </div>
</section>



      <footer>
        <p>&copy; 2025 GLA Placement Cell<br />Contact: +91-9927064017 | Email: glauniversity@gla.ac.in</p>
      </footer>
    </>
  );
};

export default Home;
