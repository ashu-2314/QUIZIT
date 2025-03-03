import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/layouts/Index";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;