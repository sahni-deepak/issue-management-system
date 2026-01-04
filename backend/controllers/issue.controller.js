import Issue from "../models/Issue.js";

// Create a new issue
export const createIssue = async (req, res) => {
  try {
    // Extract issue details from request body
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description required" });
    }

    // Create issue linked to authenticated user
    const issue = await Issue.create({
      title,
      description,
      createdBy: req.user.id,
    });

    // Respond with created issue
    return res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Fetch issues based on user role
export const getIssues = async (req, res) => {
  try {
    let issues;

    // Admin can view all issues
    if (req.user.role === "admin") {
      issues = await Issue.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    }
    // Users can view only their own issues
    else {
      issues = await Issue.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    }

    return res.json(issues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update issue status (admin only)
export const updateIssueStatus = async (req, res) => {
  try {
    // Allow access only for admin users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Extract status and issue ID
    const { status } = req.body;
    const issueId = req.params.id;

    // Validate allowed status values
    const allowedStatuses = ["open", "in-progress", "resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find issue by ID
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Update issue status
    issue.status = status;
    await issue.save();

    return res.json({
      message: "Issue status updated",
      issue,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete issue (owner or admin)
export const deleteIssue = async (req, res) => {
  try {
    // Find issue by ID
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Allow deletion by owner or admin
    if (
      issue.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Delete issue from database
    await issue.deleteOne();

    return res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};