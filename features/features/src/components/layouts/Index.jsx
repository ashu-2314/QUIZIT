import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Index.css";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      <h1>Welcome to QuizIt</h1>
      <p>Test your knowledge with fun and challenging quizzes!</p>
      <button className="start-btn" onClick={() => navigate("/register")}>
        Start Quiz
      </button>
    </div>
  );
};

export default Index;
