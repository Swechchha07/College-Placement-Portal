// src/pages/JobsPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const JobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const internalJobs = [
    {
      company: "Infosys",
      role: "Software Engineer",
      location: "Bangalore",
      applicants: 42,
      shortlisted: ["Ravi", "Ananya"],
      avgCGPA: 8.2,
      deadline: "2025-07-15"
    },
    {
      company: "TCS",
      role: "Data Analyst",
      location: "Delhi",
      applicants: 33,
      shortlisted: [],
      avgCGPA: 7.9,
      deadline: "2025-07-18"
    },
    {
      company: "Amazon",
      role: "SDE I",
      location: "Hyderabad",
      applicants: 60,
      shortlisted: ["Swechchha"],
      avgCGPA: 8.6,
      deadline: "2025-07-20"
    }
  ];

  const externalJobs = [
    {
      source: "LinkedIn",
      role: "Frontend Developer",
      company: "Microsoft",
      link: "https://linkedin.com/jobs/frontend-dev"
    },
    {
      source: "Internshala",
      role: "React Intern",
      company: "StartUpX",
      link: "https://internshala.com/internships/react"
    },
    
  ];

  const toggleSave = (job) => {
    setSavedJobs(prev =>
      prev.find(j => j.company === job.company && j.role === job.role)
        ? prev.filter(j => j.company !== job.company || j.role !== job.role)
        : [...prev, job]
    );
  };

  const isSaved = (job) =>
    savedJobs.some(j => j.company === job.company && j.role === job.role);

  return (
    <>
      {/* ✅ Top Navigation Bar */}
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

      <main className="main-content">
        <h2>💼 All Job Opportunities</h2>

        {internalJobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.role} - {job.company}</h3>
            <p>📍 {job.location}</p>
            <p>📥 {job.applicants} students applied</p>
            <p>🎯 Shortlisted: {job.shortlisted.length ? job.shortlisted.join(", ") : "None"}</p>
            <p>📊 Avg CGPA: {job.avgCGPA}</p>
            <p>📅 Deadline: {job.deadline}</p>
            <div className="job-actions">
              <button className="apply-btn" onClick={() => window.location.href = "/apply"}>
                View & Apply
              </button>
              <button className="apply-btn" onClick={() => toggleSave(job)}>
                {isSaved(job) ? "🔖 Saved" : "🔖 Save Job"}
              </button>
            </div>
          </div>
        ))}

        <hr />
        <h2>🔖 Your Saved Jobs</h2>
        {savedJobs.length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          savedJobs.map((job, index) => (
            <div key={index} className="job-card saved">
              <h4>{job.role} at {job.company}</h4>
              <p>📍 {job.location}</p>
              <p>📊 Avg CGPA: {job.avgCGPA}</p>
              <button className="apply-btn" onClick={() => window.location.href = "/apply"}>
                Apply Now
              </button>
            </div>
          ))
        )}

        <hr />
        <h2>🌐 External Opportunities</h2>
        {externalJobs.map((job, i) => (
          <div key={i} className="job-card">
            <h4>{job.role} at {job.company}</h4>
            <p>Source: {job.source}</p>
            <a href={job.link} target="_blank" rel="noreferrer" className="apply-btn">
              Apply on {job.source}
            </a>
          </div>
        ))}
      </main>
    </>
  );
};

export default JobsPage;
