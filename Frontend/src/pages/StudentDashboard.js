import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Dashboard.css";

const StudentDashboard = () => {
  const [resume, setResume] = useState({
    file: null,
    lastUpdated: null,
  });

  const [student, setStudent] = useState(null);
  const [newAchievement, setNewAchievement] = useState("");

  const handleResumeUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("resume", file);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/student/upload-resume",
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const resumeURL = URL.createObjectURL(file);

    setResume({
      file: resumeURL,
      lastUpdated: new Date().toLocaleDateString(),
    });

    alert("✅ Resume uploaded successfully!");
  } catch (err) {
    console.error("❌ Resume upload failed:", err.response?.data || err.message);
    alert("❌ Resume upload failed");
  }
};


  const handleDeleteResume = () => {
    setResume({ file: null, lastUpdated: null });
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


  const handleAddAchievement = () => {
    if (newAchievement.trim() !== "") {
      setStudent((prev) => ({
        ...prev,
        achievements: [...(prev.achievements || []), newAchievement],
      }));
      setNewAchievement("");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        {!student ? (
          <p>Loading profile...</p>
        ) : (
          <>
            <div className="dashboard-header">
              <img
                src={student.profilePic || "https://i.pravatar.cc/120?img=47"}
                alt="Profile"
                className="profile-pic"
              />
              <div>
                <h2>{student.name}</h2>
                <p><strong>University Roll No:</strong> {student.roll || "N/A"}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
                <p><strong>Branch:</strong> {student.branch}</p>
              </div>
            </div>

            <div className="summary-cards">
              <div className="card blue">
                <h3>CGPA</h3>
                <p>{student.cgpa || "N/A"}</p>
              </div>
              <div className="card green">
                <h3>Applications</h3>
                <p>{student.jobs?.length || 0}</p>
              </div>
              <div className="card purple">
                <h3>Achievements</h3>
                <p>{student.achievements?.length || 0}</p>
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
                  {student.jobs?.map((job, i) => (
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
                {student.achievements?.map((ach, i) => (
                  <li key={i}>🏆 {ach}</li>
                ))}
              </ul>

              <div style={{ marginTop: "1rem" }}>
                <input
                  type="text"
                  placeholder="Enter new achievement"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  style={{ padding: "6px", borderRadius: "4px", marginRight: "8px", width: "300px" }}
                />
                <button onClick={handleAddAchievement}>Add Achievement</button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
