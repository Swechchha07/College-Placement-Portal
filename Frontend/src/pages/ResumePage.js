// src/pages/ResumePage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import axios from "axios";

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


  useEffect(() => {
  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/student/get-resume", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.filename) {
        setResume({
          file: `http://localhost:5000/uploads/${res.data.filename}`,
          lastUpdated: new Date(res.data.updatedAt).toLocaleDateString(),
        });
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
    }
  };

  fetchResume();
}, []);


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
                type="application/pdf"
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
