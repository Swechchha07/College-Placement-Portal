// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import loginBg from "../assets/1746183253phpTmh5NC.jpg";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    rollno: "",
    cgpa: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(res.data.message);
      setIsSignup(false);
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const url = isAdmin
        ? "http://localhost:5000/api/admin/login"
        : "http://localhost:5000/api/auth/login";

      const res = await axios.post(url, { email, password });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      window.location.href = isAdmin ? "/admin/dashboard" : "/home";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const loginPageStyle = {
    backgroundImage: `url(${loginBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className={isSignup ? "signup-mode" : ""} style={loginPageStyle}>
      <div className="form-container">
        <h1>{isSignup ? "Sign Up" : isAdmin ? "Admin Login" : "Student Login"}</h1>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          {!isSignup ? (
            <>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <div style={{ marginTop: "10px", color: "white" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    style={{ marginRight: "5px" }}
                  />
                  Login as Admin
                </label>
              </div>

              <button type="submit" className="btn">Log In</button>

              <div className="form-footer">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="signup-grid-modern">
                <div className="input-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                </div>

                <div className="input-group">
                  <label>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"required />
                </div>

                <div className="input-group">
                  <label>Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
                </div>

                <div className="input-group">
                  <label>Branch:</label>
                  <input type="text" name="branch" value={formData.branch} onChange={handleChange}placeholder="Enter branch" required />
                </div>

                <div className="input-group">
                  <label>University Roll No.:</label>
                  <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} placeholder="Enter rollno." required />
                </div>

                <div className="input-group">
                  <label>CGPA:</label>
                  <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange}placeholder="Enter CGPA" required />
                </div>
              </div>

              <div className="form-actions-modern">
                <button type="button" className="btn secondary" onClick={() => setIsSignup(false)}>
                  Back to Login
                </button>
                <button type="submit" className="btn primary">Sign Up</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
