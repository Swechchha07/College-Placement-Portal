// src/pages/EventsPage.js
import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const EventsPage = () => {
  const events = [
    { company: "Infosys", date: "2025-07-10", time: "10:00 AM" },
    { company: "TCS", date: "2025-07-12", time: "11:00 AM" },
    { company: "Amazon", date: "2025-07-15", time: "02:00 PM" },
    { company: "Google", date: "2025-07-18", time: "09:00 AM" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="section">
          <h2>📅 Upcoming Company Exams</h2>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Exam Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={i}>
                  <td>{event.company}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
