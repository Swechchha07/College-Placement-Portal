import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Dashboard.css";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newAchievement, setNewAchievement] = useState("");
  const [newJob, setNewJob] = useState({ company: "", role: "", status: "" });

  const token = localStorage.getItem("token");

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          branch: res.data.branch || "",
        });
      } catch (err) {
        alert(err.response?.data?.error || "Profile load failed");
      }
    };
    fetchProfile();
  }, [token]);

  // Profile edit handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/api/student/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  // Achievement handlers
  const handleAddAchievement = async () => {
    if (!newAchievement.trim()) return;
    const res = await axios.post(
      "http://localhost:5000/api/student/achievements",
      { text: newAchievement },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStudent((prev) => ({ ...prev, achievements: res.data }));
    setNewAchievement("");
  };

  const handleDeleteAchievement = async (index) => {
    const res = await axios.delete(`http://localhost:5000/api/student/achievements/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent((prev) => ({ ...prev, achievements: res.data }));
  };

  // Job handlers
  const handleAddJob = async () => {
    const { company, role, status } = newJob;
    if (!company || !role || !status) return;
    const res = await axios.post(
      "http://localhost:5000/api/student/jobs",
      newJob,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStudent((prev) => ({ ...prev, jobs: res.data }));
    setNewJob({ company: "", role: "", status: "" });
  };

  const handleDeleteJob = async (index) => {
    const res = await axios.delete(`http://localhost:5000/api/student/jobs/${index}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent((prev) => ({ ...prev, jobs: res.data }));
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <img
            src={student.profilePic || "https://i.pravatar.cc/120"}
            alt="Profile"
            className="profile-pic"
          />
          {!editMode ? (
            <>
              <h2>{student.name}</h2>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleProfileUpdate} className="edit-form">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" />
              <button type="submit">✅ Save</button>
              <button type="button" onClick={() => setEditMode(false)}>❌ Cancel</button>
            </form>
          )}
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
            {student.resume ? (
              <a href={`http://localhost:5000/uploads/${student.resume}`} target="_blank" rel="noreferrer">
                📄 View Resume
              </a>
            ) : (
              <p>No resume uploaded</p>
            )}
          </div>
        </div>

        <section className="section">
          <h3>Achievements</h3>
          <ul className="achievements-list">
            {student.achievements?.map((ach, i) => (
              <li key={i}>
                🏆 {ach}
                <button onClick={() => handleDeleteAchievement(i)} className="delete-btn">❌</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="New achievement"
          />
          <button onClick={handleAddAchievement}>➕ Add Achievement</button>
        </section>

        <section className="section">
          <h3>Applied Jobs</h3>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.jobs?.map((job, i) => (
                <tr key={i}>
                  <td>{job.company}</td>
                  <td>{job.role}</td>
                  <td>{job.status}</td>
                  <td>
                    <button onClick={() => handleDeleteJob(i)} className="delete-btn">❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-job-form">
            <input
              type="text"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role"
              value={newJob.role}
              onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
            />
            <input
              type="text"
              placeholder="Status"
              value={newJob.status}
              onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            />
            <button onClick={handleAddJob}>➕ Add Job</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
