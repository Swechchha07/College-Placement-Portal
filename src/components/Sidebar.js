import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="logo">My Profile</h2>
    <nav>
      <ul>
        <li><Link to="/Home">🏠 Home</Link></li>
        <li><Link to="/resume">📄 Resume</Link></li>
        <li><Link to="/events">📅 Upcoming Events</Link></li>
        <li><Link to="/">🚪 Logout</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
