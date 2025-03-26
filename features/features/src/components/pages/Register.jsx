import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    preferences: [],
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle preferences selection
  const handlePreferencesChange = (e) => {
    const { value, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      preferences: checked
        ? [...prevUser.preferences, value]
        : prevUser.preferences.filter((pref) => pref !== value),
    }));
  };

  // Validate Steps
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!user.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Invalid email format";
      if (!user.phone) newErrors.phone = "Phone is required";
      if (!user.dob) newErrors.dob = "Date of Birth is required";
      if (!user.gender) newErrors.gender = "Gender is required";
    }

    if (step === 2) {
      if (!user.password) newErrors.password = "Password is required";
      else if (user.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (user.password !== user.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    if (step === 3) {
      if (!user.termsAccepted) newErrors.termsAccepted = "You must accept the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if email is already registered
  const checkEmailExists = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${user.email}`);
      if (response.data.length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Email already registered" }));
        return true;
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
    return false;
  };

  // Proceed to next step
  const nextStep = async () => {
    if (validateStep()) {
      if (step === 1) {
        const emailExists = await checkEmailExists();
        if (emailExists) return;
      }
      setStep(step + 1);
    }
  };

  // Go back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit Form (Store Data in JSON Server)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const userData = {
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      password: user.password, // In real apps, hash passwords before storing
      preferences: user.preferences,
    };

    try {
      const response = await axios.post("http://localhost:3000/users", userData);

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        throw new Error("Failed to register user.");
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
            {errors.email && <p className="error">{errors.email}</p>}
            <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
            {errors.phone && <p className="error">{errors.phone}</p>}
            <input type="date" name="dob" onChange={handleChange} required />
            {errors.dob && <p className="error">{errors.dob}</p>}
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
            {errors.gender && <p className="error">{errors.gender}</p>}
            <button type="button" onClick={nextStep}>Next</button>
          </>
        )}

        {/* Step 2: Account Setup */}
        {step === 2 && (
          <>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
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
                  <input type="checkbox" value={subject} onChange={handlePreferencesChange} />
                  <span>{subject}</span>
                </label>
              ))}
            </div>

            <div className="terms">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  onChange={(e) => setUser({ ...user, termsAccepted: e.target.checked })}
                  required
                />
                <span>I accept the Terms & Conditions</span>
              </label>
            </div>
            {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}

            <button type="button" onClick={prevStep} className="back-btn">Back</button>
            <button type="submit" className="register-btn">Register</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
