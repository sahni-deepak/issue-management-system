import express from "express";
import {
  createIssue,
  getIssues,
  updateIssueStatus,
  deleteIssue,
} from "../controllers/issue.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/", protect, getIssues);
router.patch("/:id", protect, updateIssueStatus);
router.delete("/:id", protect, deleteIssue);

export default router;