import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// ✅ API Base URL
const API_BASE_URL = "https://quizit-server.onrender.com/users";

// Create Auth Context
const AuthContext = createContext();

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  // ✅ Check authentication status on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/me`, { withCredentials: true }) // ✅ Fetch logged-in user
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false)); // ✅ Stop loading after request
  }, []);

  // ✅ Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`, // ✅ Corrected endpoint
        { email, password },
        { withCredentials: true }
      );

      if (response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        console("login success")
        return { success: true };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Failed to login. Please try again." };
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true }); // ✅ Corrected endpoint
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ PropTypes for better safety
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
