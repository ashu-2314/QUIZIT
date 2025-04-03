import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {
  const { state, logout } = useAuth();
  const { isAuthenticated, user, role } = state;

  return (
    <header className="header">
      <div className="logo">QuizIt</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/quizzes">Quizzes</Link>

        {isAuthenticated ? (
          <>
            {/* Role-based Navigation */}
            {role === "ADMIN" && (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <Link to="/admin/manage-quizzes">Manage Quizzes</Link>
              </>
            )}
            {role === "STUDENT" && (
              <>
                <Link to="/dashboard">Student Dashboard</Link>
                <Link to="/leaderboard">Leaderboard</Link>
              </>
            )}

            {/* Common for all logged-in users */}
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
