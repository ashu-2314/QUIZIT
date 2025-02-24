import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>QuizIt</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Quizzes</a></li>
          <li><a href="#">Leaderboard</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Register</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
