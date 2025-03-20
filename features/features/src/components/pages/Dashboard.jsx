import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = ({ userData }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userData || JSON.parse(sessionStorage.getItem("userData")));

  useEffect(() => {
    if (!user) {
      console.log("No user data found, redirecting to login...");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h1>Welcome to QuizIt, {user.name || "User"}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}>Logout</button>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Dashboard;
