import React from "react";
import "../styles/Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">QuizIt</div>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/quizzes">Quizzes</a>
                <a href="/profile">Profile</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </nav>
        </header>
    );
};

export default Header;
