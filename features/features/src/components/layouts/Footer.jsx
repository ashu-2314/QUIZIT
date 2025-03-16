import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>QuizMaster</h3>
          <p>Your go-to platform for challenging quizzes and enhancing knowledge.</p>
          <p><strong>Contact:</strong> support@quizmaster.com</p>
          <p><strong>Location:</strong> 123 Quiz Street, Knowledge City, 45678</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="#">Quizzes</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-column">
          <h3>Quiz Categories</h3>
          <a href="#">Science</a>
          <a href="#">Math</a>
          <a href="#">History</a>
          <a href="#">Technology</a>
          <a href="#">General Knowledge</a>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /> Facebook</a>
            <a href="#" aria-label="Twitter"><FaTwitter /> Twitter</a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /> Whatsapp</a>
            <a href="#" aria-label="Instagram"><FaInstagram /> Instagram</a>
          </div>
          
        </div>
      </div>
      <div className="footer-bottom">© 2025 QuizMaster. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
