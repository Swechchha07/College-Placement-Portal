// src/pages/ResumePage.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const ResumePage = () => {
  const [resume, setResume] = useState({
    file: null,
    lastUpdated: null,
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume({
        file: URL.createObjectURL(file),
        lastUpdated: new Date().toLocaleDateString(),
      });
    }
  };

  const handleDelete = () => {
    setResume({ file: null, lastUpdated: null });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="section">
          <h2>📄 Resume Upload & Preview</h2>

          {resume.file ? (
            <>
              <p><strong>Last Updated:</strong> {resume.lastUpdated}</p>
              <iframe
                src={resume.file}
                width="100%"
                height="500px"
                title="Resume Preview"
              />
              <button onClick={handleDelete} className="delete-btn">🗑 Delete Resume</button>
            </>
          ) : (
            <>
              <p>No resume uploaded.</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                className="upload-input"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumePage;
