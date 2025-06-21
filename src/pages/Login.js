// src/pages/Login.js
import React, { useState } from "react";
import "../styles/Login.css";
import loginBg from "../assets/1746183253phpTmh5NC.jpg"; // ✅ Import image

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful!");
    window.location.href = "/home";
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
    setIsSignup(false);
  };

  // ✅ Inline style for full-page background
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
              <input type="text" placeholder="Enter your name" required />

              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Create Password:</label>
              <input type="password" placeholder="Enter a password" required />

              <label>Branch:</label>
              <input type="text" placeholder="Enter your branch" required />

              <button type="submit" className="btn">Create Account</button>
            </form>
          </>
        ) : (
          <>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Password:</label>
              <input type="password" placeholder="Enter your password" required />

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
