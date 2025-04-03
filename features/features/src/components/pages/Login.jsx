import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData,
        { withCredentials: true }
      );

      const { username, role } = response.data;

      // Store user session
      login(username, role);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
