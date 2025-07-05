// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import loginBg from "../assets/1746183253phpTmh5NC.jpg";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: ""
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
      setIsSignup(false); // switch to login
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token); // store JWT token
      window.location.href = "/home"; // redirect to dashboard
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
    <div style={loginPageStyle}>
      <div className="form-container">
        {isSignup ? (
          <>
            <h1>SIGN UP FORM</h1>
            <form onSubmit={handleSignup}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

              <label>Create Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter a password" required />

              <label>Branch:</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Enter your branch" required />

              <button type="submit" className="btn">Create Account</button>
              <button type="button" onClick={() => setIsSignup(false)} className="btn">Back to Login</button>
            </form>
          </>
        ) : (
          <>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />

              <div className="button-group">
                <button type="button" onClick={() => setIsSignup(true)}>Sign Up</button>
                <button type="submit">Log In</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
