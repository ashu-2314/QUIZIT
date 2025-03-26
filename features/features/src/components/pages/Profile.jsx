import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth(); // Use AuthContext


  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "https://www.w3schools.com/howto/img_avatar.png");

  if (!user) {
    navigate("/login"); // Redirect if not authenticated
    return null;
  }

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = { ...user, [editingField]: tempValue };

    try {
      const response = await axios.put(
        `https://quizit-server.onrender.com/users/${user.email}`,
        updatedUser
      );

      updateProfile(response.data); // Update context state
    } catch (error) {
      console.error("Error updating user:", error);
    }

    setEditingField(null);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div>
        <img src={profilePic} alt="Profile" className="profile-image" />
        <input
          type="text"
          placeholder="Enter image URL"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          className="profile-image-input"
        />
      </div>

      <div className="profile-fields">
        {Object.keys(user).map(
          (key) =>
            key !== "email" &&
            key !== "profilePic" && (
              <div key={key} className="profile-field">
                <span>{key}:</span>
                {editingField === key ? (
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <span>{user[key]}</span>
                )}
                {editingField === key ? (
                  <button onClick={handleSave} className="profile-btn save-btn">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(key, user[key])} className="profile-btn edit-btn">
                    Edit
                  </button>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Profile;
