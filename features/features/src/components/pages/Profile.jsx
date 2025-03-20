import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ userData }) => {
  const [user, setUser] = useState(userData || null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [profilePic, setProfilePic] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data only if not already set
    if (!user) {
      const storedUser = sessionStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        console.log("No user found, redirecting to login...");
        navigate("/login");
      }
    }
  }, [navigate, user]);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = async () => {
    if (!user || !user.id) return;

    const updatedUser = { ...user, [editingField]: tempValue };

    try {
      const response = await axios.put(
        `https://quizit-server.onrender.com/users/${user.id}`,
        updatedUser
      );
      setUser(response.data);
      sessionStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error updating user:", error);
    }

    setEditingField(null);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          {/* Profile Picture */}
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

          {/* Editable Fields */}
          <div className="profile-fields">
            {Object.keys(user).map(
              (key) =>
                key !== "id" &&
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
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
