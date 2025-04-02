import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuth(); // Use AuthContext
  const { isAuthenticated, user } = state; // Extract user and isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("No user data found, redirecting to login...");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <img 
          src={user.profilePic || "https://www.w3schools.com/howto/img_avatar.png"} 
          alt="User Avatar" 
          className="profile-pic"
        />
        <h1>Welcome, {user.username || "User"}!</h1>
        <p className="email-text">📧 {user.email}</p>

        <div className="dashboard-buttons">
          <button className="primary-btn" onClick={() => navigate("/quizzes")}>
            🎯 Take a Quiz
          </button>
          <button className="secondary-btn" onClick={() => navigate("/profile")}>
            🔍 View Profile
          </button>
        </div>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
