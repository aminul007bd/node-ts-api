import { createJobPost, getJobPosts } from "../controllers/jobPostController";

import express from "express";

const jobPostRouter = express.Router();

jobPostRouter.get("/jobPosts", getJobPosts);
jobPostRouter.post("/jobPosts", createJobPost);
jobPostRouter.put("/jobPosts/:id", createJobPost);
jobPostRouter.delete("/jobPosts/:id", createJobPost);

export default jobPostRouter;
