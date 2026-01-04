import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import IssueItem from "../components/IssueItem";

// User dashboard for creating and managing issues
const Dashboard = () => {
  const [issues, setIssues] = useState([]);

  // Form state for new issue
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch issues from backend
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

  // Handle issue creation
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    const { title, description } = formData;

    // Client-side validation
    if (!title.trim()) return setError("Title is required");
    if (!description) return setError("Description is required");

    try {
      await API.post("/issues", formData);

      setFormData({
        title: "",
        description: "",
      });

      fetchIssues();
    } catch (err) {
      alert("Failed to create issue");
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

      <h3>User Dashboard</h3>

      <p className="error-text">{error || "\u00A0"}</p>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          name="title"
          placeholder="Issue title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          placeholder="Issue description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
        />

        <button className="btn" type="submit">Create Issue</button>
      </form>

      {issues.length > 0 && <h4>Issues</h4>}

      {issues.length === 0 ? (
        <p>No issues found</p>
      ) : (
        issues.map((issue) => (
          <IssueItem
            key={issue._id}
            issue={issue}
            onDelete={handleDelete}
            isAdmin={false}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;