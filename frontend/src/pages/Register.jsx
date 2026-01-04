import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

// User registration page
const Register = () => {
  const navigate = useNavigate();

  // Form state for registration inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // UI state for error handling and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    // Client-side validation
    if (!name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");
    if (!password) return setError("Password is required");

    try {
      setLoading(true);

      // Send registration request to backend
      await API.post("/auth/register", formData);

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Register</h2>

      <p className="error-text">{error || "\u00A0"}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;