import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "../styles/Index.css";
 
const Index = () => {
  return (
    <div className="index">
      <Header />
      <main>
        <h2>Welcome to QuizIt</h2>
        <p>Test your knowledge with fun and challenging quizzes!</p>
        <a href="#" className="start-quiz">Start Quiz</a>
      </main>
      <Footer />
    </div>
  );
};
 
export default Index;