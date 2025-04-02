import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/AuthContext"; // Import Auth Context
import Index from "./components/layouts/Index";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard"; 
import Profile from "./components/pages/Profile";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  console.log(state.isAuthenticated)
  return state.isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider> {/* ✅ Wrap the app with AuthProvider */}
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
