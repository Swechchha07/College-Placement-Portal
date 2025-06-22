import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import ApplyPage from "./pages/ApplyPage";
import StudentProfile from "./pages/StudentDashboard"; // this is your full profile view
import ResumePage from "./pages/ResumePage"; // 👈 new resume-only view
import EventsPage from "./pages/EventsPage"; // 👈 new events view

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/resume" element={<ResumePage />} />  {/* NEW */}
        <Route path="/events" element={<EventsPage />} />  {/* NEW */}
      </Routes>
    </Router>
  );
}

export default App;
