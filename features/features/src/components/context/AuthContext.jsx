import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import authReducer from "../reducer/authReducer";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = { isAuthenticated: false, user: null, role: null };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/check-auth",
          {
            withCredentials: true, // Include cookies in request
          }
        );

        if (response.data.user) {
          dispatch({ 
            type: "LOGIN", 
            payload: { user: response.data.user, role: response.data.role } 
          }); // Store user and role
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false); // Update loading state after fetching
      }
    };

    checkAuth();
  }, []); // Run only once when component mounts

  const login = (user, role) => {
    dispatch({ type: "LOGIN", payload: { user, role } }); // Store full user object and role
  };

  const updateProfile = (updates) => {
    dispatch({ type: "UPDATE", payload: updates });
  };

  const logout = async () => {
    await fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ state, login, logout, updateProfile, loading, role: state.role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
