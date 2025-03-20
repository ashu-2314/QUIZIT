import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./components/layouts/Index";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard"; 
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Profile from "./components/pages/Profile";

const App = () => {
  // ✅ Check sessionStorage when app loads
  const [userData, setUserData] = useState(() => {
    const storedUser = sessionStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Update sessionStorage when userData changes
  useEffect(() => {
    if (userData) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("userData");
    }
  }, [userData]);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/profile" element={userData ? <Profile userData={userData} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={userData ? <Dashboard userData={userData} /> : <Navigate to="/login" />} /> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
