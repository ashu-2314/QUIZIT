import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    email: "",
    phone: "",
    dob: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT", // Default role selection
    preferences: [],
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "preferences") {
      setUser((prevUser) => ({
        ...prevUser,
        preferences: checked
          ? [...prevUser.preferences, value]
          : prevUser.preferences.filter((pref) => pref !== value),
      }));
    } else {
      setUser({ ...user, [name]: type === "checkbox" ? checked : value });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Proceed to next step
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", user);
      if (response.data) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>
        Step {step}: {step === 1 ? "Personal Details" : step === 2 ? "Account Setup" : "Preferences & Confirmation"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="date" name="dob" onChange={handleChange} required />
            
            <div className="gender-options">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" onChange={handleChange} required /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="other" onChange={handleChange} required /> Other
              </label>
            </div>

            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {/* Step 2: Account Setup */}
        {step === 2 && (
          <>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* Role Selection */}
            <div className="role-selection">
              <label>
                <input type="radio" name="role" value="STUDENT" checked={user.role === "STUDENT"} onChange={handleChange} />
                Student
              </label>
              <label>
                <input type="radio" name="role" value="ADMIN" checked={user.role === "ADMIN"} onChange={handleChange} />
                Faculty/Admin
              </label>
            </div>

            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {/* Step 3: Preferences & Confirmation */}
        {step === 3 && (
          <>
            <h3 className="section-title">Select Your Quiz Preferences:</h3>
            <div className="quiz-preferences">
              {["Science", "Math", "History", "Technology"].map((subject) => (
                <label key={subject}>
                  <input type="checkbox" name="preferences" value={subject} onChange={handleChange} />
                  <span>{subject}</span>
                </label>
              ))}
            </div>

            <div className="terms">
              <label>
                <input type="checkbox" name="termsAccepted" onChange={handleChange} required />
                <span>I accept the Terms & Conditions</span>
              </label>
            </div>

            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit">Register</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
