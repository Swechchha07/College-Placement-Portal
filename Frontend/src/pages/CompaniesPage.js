// src/pages/CompaniesPage.js
import React, { useState } from "react";
import "../styles/Dashboard.css"; // Make sure your CSS file includes header styles

const mockStudent = {
  branch: "CSE",
  cgpa: 8.2,
  hasBacklogs: false,
};

const companies = [
  {
    id: 1,
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    type: "Service",
    location: "Bangalore",
    cgpaRequirement: 7.0,
    branchAllowed: ["CSE", "IT", "ECE"],
    backlogsAllowed: false,
    roles: ["Software Engineer", "System Engineer"],
    about: "Infosys is a global leader in technology services and consulting.",
    visitHistory: [
      { year: 2022, date: "2022-08-15", avgPackage: "4 LPA", highPackage: "6 LPA", placed: 45 },
      { year: 2023, date: "2023-08-17", avgPackage: "4.5 LPA", highPackage: "6.5 LPA", placed: 55 },
    ],
    linkedin: "https://www.linkedin.com/company/infosys/",
    website: "https://www.infosys.com",
    testimonial: "My interview had 2 rounds: Technical + HR. Prepare DSA and projects well."
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-768x432.png",
    type: "Product",
    location: "Hyderabad",
    cgpaRequirement: 8.0,
    branchAllowed: ["CSE", "IT"],
    backlogsAllowed: false,
    roles: ["SDE I", "Support Engineer"],
    about: "Amazon is a leading e-commerce and cloud computing company.",
    visitHistory: [
      { year: 2022, date: "2022-09-05", avgPackage: "12 LPA", highPackage: "18 LPA", placed: 12 },
      { year: 2023, date: "2023-09-07", avgPackage: "14 LPA", highPackage: "20 LPA", placed: 15 },
    ],
    linkedin: "https://www.linkedin.com/company/amazon/",
    website: "https://www.amazon.jobs",
    testimonial: "It focused heavily on problem-solving. DSA and system design basics are key."
  }
];

const CompaniesPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const checkEligibility = (company) => {
    return (
      mockStudent.cgpa >= company.cgpaRequirement &&
      company.branchAllowed.includes(mockStudent.branch) &&
      (!mockStudent.hasBacklogs || company.backlogsAllowed)
    );
  };

  return (
    <>
      {/* ✅ Top Navbar */}
      <header>
        <div className="logo">Placement Portal</div>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/">Logout</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2>🏢 Recruiting Companies</h2>

        {!selectedCompany ? (
          <div className="grid">
            {companies.map((comp) => (
              <div key={comp.id} className="company-card" onClick={() => setSelectedCompany(comp)}>
                <img src={comp.logo} alt={comp.name} />
                <h3>{comp.name}</h3>
                <p>{comp.roles.join(", ")}</p>
                <p>{comp.type} Company</p>
                <p>📍 {comp.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="company-details">
            <h2>{selectedCompany.name}</h2>
            <p><strong>About:</strong> {selectedCompany.about}</p>
            <p><strong>Roles Offered:</strong> {selectedCompany.roles.join(", ")}</p>
            <p><strong>Type:</strong> {selectedCompany.type}</p>
            <p><strong>Location:</strong> {selectedCompany.location}</p>
            <p><strong>Eligibility:</strong> {checkEligibility(selectedCompany) ? "✅ You're eligible" : "❌ Not eligible"}</p>

            <h3>📅 Visit History at GLA</h3>
            <table className="jobs-table">
              <thead>
                <tr><th>Year</th><th>Date</th><th>Avg Package</th><th>High Package</th><th>Placed</th></tr>
              </thead>
              <tbody>
                {selectedCompany.visitHistory.map((v, i) => (
                  <tr key={i}>
                    <td>{v.year}</td>
                    <td>{v.date}</td>
                    <td>{v.avgPackage}</td>
                    <td>{v.highPackage}</td>
                    <td>{v.placed}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p><strong>🌐 Website:</strong> <a href={selectedCompany.website} target="_blank" rel="noreferrer">{selectedCompany.website}</a></p>
            <p><strong>🔗 LinkedIn:</strong> <a href={selectedCompany.linkedin} target="_blank" rel="noreferrer">{selectedCompany.linkedin}</a></p>

            <h3>🗣️ Testimonial</h3>
            <blockquote>{selectedCompany.testimonial}</blockquote>

            <button className="apply-btn" onClick={() => setSelectedCompany(null)}>⬅ Back to Directory</button>
          </div>
        )}
      </main>
    </>
  );
};

export default CompaniesPage;
