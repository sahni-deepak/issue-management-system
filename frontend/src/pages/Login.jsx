import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

// Login page for authenticating users
const Login = () => {
  const navigate = useNavigate();

  // Form state for login inputs
  const [formData, setFormData] = useState({
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

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    // Client-side validation
    if (!email.trim()) return setError("Email is required");
    if (!password) return setError("Password is required");

    try {
      setLoading(true);

      // Send login request to backend
      const res = await API.post("/auth/login", formData);

      // Store auth token and role in local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Navigate user based on their role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>

      <p className="error-text">{error || "\u00A0"}</p>

      <form onSubmit={handleSubmit}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;