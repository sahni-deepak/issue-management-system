import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// Navigation bar with logout action
const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Clear auth state and redirect to login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Bug Tracker</h2>

      <div>
        <span>
          Role: <strong>{role}</strong>
        </span>

        <button className="btn btn--nav" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;