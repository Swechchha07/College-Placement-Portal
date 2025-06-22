// src/pages/StudentDashboard.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const StudentDashboard = () => {
  const [resume, setResume] = useState({
    file: null,
    lastUpdated: null,
  });

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume({
        file: URL.createObjectURL(file),
        lastUpdated: new Date().toLocaleDateString(),
      });
    }
  };

  const handleDeleteResume = () => {
    setResume({ file: null, lastUpdated: null });
  };

  const student = {
    name: "Swechchha Nigam",
    roll: "2215001826",
    email: "nigam316@gmail.com",
    phone: "7387814824",
    branch: "B.Tech CSE",
    profilePic: "https://i.pravatar.cc/120?img=47",
    cgpa: "8.45",
    applications: 3,
    achievements: 4,
    jobs: [
      { company: "Infosys", role: "Software Engineer", status: "Shortlisted" },
      { company: "TCS", role: "Data Analyst", status: "Applied" },
      { company: "Amazon", role: "SDE I", status: "Rejected" }
    ],
    achievementsList: [
      "GLA Hackathon Winner 2024",
      "Top 5 - CodeChef University Contest",
      "Certification - Data Science (Coursera)",
      "Smart India Hackathon Finalist"
    ]
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <img src={student.profilePic} alt="Profile" className="profile-pic" />
          <div>
            <h2>{student.name}</h2>
            <p><strong>University Roll No:</strong> {student.roll}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
          </div>
        </div>

        <div className="summary-cards">
          <div className="card blue">
            <h3>CGPA</h3>
            <p>{student.cgpa}</p>
          </div>
          <div className="card green">
            <h3>Applications</h3>
            <p>{student.applications}</p>
          </div>
          <div className="card purple">
            <h3>Achievements</h3>
            <p>{student.achievements}</p>
          </div>
          <div className="card gray">
            <h3>Resume</h3>
            {resume.file ? (
              <>
                <p>📅 {resume.lastUpdated}</p>
                <a href={resume.file} target="_blank" rel="noreferrer">📄 View Resume</a>
                <button onClick={handleDeleteResume} className="delete-btn">🗑 Delete</button>
              </>
            ) : (
              <>
                <p>No resume uploaded</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="upload-input"
                />
              </>
            )}
          </div>
        </div>

        <section className="section">
          <h3>Applied Jobs</h3>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {student.jobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.company}</td>
                  <td>{job.role}</td>
                  <td className={`status ${job.status.toLowerCase()}`}>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section">
          <h3>Achievements</h3>
          <ul className="achievements-list">
            {student.achievementsList.map((ach, i) => (
              <li key={i}>🏆 {ach}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
