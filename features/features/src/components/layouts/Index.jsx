import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Index.css";

const Index = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const faqs = [
    { question: "What is QuizIt?", answer: "QuizIt is an interactive platform where you can take quizzes, challenge friends, and learn in a fun way!" },
    { question: "How do I start a quiz?", answer: "Simply sign up and click on 'Start Quiz' to begin your journey!" },
    { question: "Is QuizIt free to use?", answer: "Yes! QuizIt is completely free to play and enjoy." },
    { question: "Can I create my own quizzes?", answer: "Yes! After signing in, you can create and share quizzes with others." },
  ];

  // Track scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="index-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="text-content">
          <h1>Engaging Quizzes for Everyone!</h1>
          <p>Challenge yourself, learn new things, and have fun with QuizIt.</p>
          <div className="buttons">
            <button className="start-btn" onClick={() => navigate("/register")}>Sign Up</button>
            <button className="explore-btn" onClick={() => navigate("/quizzes")}>Explore Quizzes</button>
          </div>
        </div>
        <div className="image-container">
          <img src="/quiz.jpg" alt="Quiz Illustration" className="quiz-image" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                {faq.question}
                <span>{faqOpen === index ? "▼" : "▶"}</span>
              </div>
              {faqOpen === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑ 
        </button>
      )}
    </div>
  );
};

export default Index;
