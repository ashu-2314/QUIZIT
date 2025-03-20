import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ setUserData }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("🔹 Sending login request:", user);

    try {
      const response = await axios.post("https://quizit-server.onrender.com/users", user);
      console.log("✅ Login Response Data:", response.data);

      if (response.data) {  
        setUserData(response.data);
        sessionStorage.setItem("userData", JSON.stringify(response.data));

        setSuccess("✅ Login Successful! Redirecting...");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        console.error("❌ Invalid login response format:", response.data);
        setError("Invalid email or password. Try again.");
      }
    } catch (err) {
      console.error("❌ Login failed. Error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      {/* Added Registration Link */}
      <p className="register-link">
        Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
