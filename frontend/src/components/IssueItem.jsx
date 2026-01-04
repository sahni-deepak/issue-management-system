// Issue card component
const IssueItem = ({ issue, onDelete, onStatusChange, isAdmin }) => {
  return (
    <div className="issue-card">
      <p>
        <strong>{issue.title}</strong>
      </p>

      <p className="issue-text">{issue.description}</p>

      {/* Show creator details only for admin */}
      {isAdmin && issue.createdBy && (
        <p>
          Created by: {issue.createdBy.name} ({issue.createdBy.email})
        </p>
      )}

      {/* Allow status change only for admin */}
      {isAdmin && onStatusChange && (
        <div className="status-control">
          <span className="status-label">Change issue status</span>

          <div className="status-select-wrapper">
            <select
              className={`status-select status-select--${issue.status}`}
              value={issue.status}
              onChange={(e) => onStatusChange(issue._id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      )}

      <div className="issue-actions">
        <p>
          Status: <strong>{issue.status}</strong>
        </p>

        <button className="btn btn--nav" onClick={() => onDelete(issue._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueItem;