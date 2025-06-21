// src/components/Sidebar.js
import React from "react";
import "../styles/Dashboard.css"; // Ensure this path is correct

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">GLA Portal</h2>
      <nav>
        <ul>
          <li>🏠 Home</li>
          <li>💼 Jobs</li>
          <li>📄 Resume</li>
          <li>🎓 My Profile</li>
          <li>🚪 Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
