import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const { user } = state;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={user?.profilePic || "https://www.w3schools.com/howto/img_avatar.png"} 
            alt="Profile" 
            className="profile-pic"
          />
          <h1>{user?.name || "User"}</h1>
          <p className="profile-email">📧 {user?.email}</p>
        </div>

        <div className="profile-details">
          <h2>Profile Information</h2>
          <p><strong>Username:</strong> {user?.username || "N/A"}</p>
          <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString() || "N/A"}</p>
          <p><strong>Role:</strong> {user?.role || "Participant"}</p>
        </div>

        <div className="profile-actions">
          <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
            ✏️ Edit Profile
          </button>
          <button className="logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
