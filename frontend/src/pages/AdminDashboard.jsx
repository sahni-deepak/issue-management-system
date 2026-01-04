import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import IssueItem from "../components/IssueItem";

// Admin dashboard for managing all issues
const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all issues from backend
  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await API.get("/issues");
      setIssues(res.data);
    } catch (err) {
      setError("Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  // Load issues on initial render
  useEffect(() => {
    fetchIssues();
  }, []);

  // Update issue status
  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/issues/${id}`, { status });

      // Update issue state
      setIssues((prev) =>
        prev.map((issue) => (issue._id === id ? { ...issue, status } : issue))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Handle issue deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this issue?")) return;

    try {
      await API.delete(`/issues/${id}`);
      setIssues((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert("Failed to delete issue");
    }
  };

  if (loading) return <p className="loading-text">Loading issues...</p>;

  return (
    <div className="dashboard">
      <Navbar />

      <h3>Admin Dashboard</h3>

      <p className="error-text">{error || "\u00A0"}</p>

      {issues.length > 0 && <h4>Issues</h4>}

      {issues.length === 0 ? (
        <p>No issues found</p>
      ) : (
        issues.map((issue) => (
          <IssueItem
            key={issue._id}
            issue={issue}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            isAdmin={true}
          />
        ))
      )}
    </div>
  );
};

export default AdminDashboard;