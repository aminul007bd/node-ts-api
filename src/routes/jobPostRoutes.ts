import { createJobPost, getJobPosts } from "../controllers/jobPostController";

import express from "express";

const jobPostRouter = express.Router();

jobPostRouter.get("/jobPosts", getJobPosts);
jobPostRouter.post("/jobPosts", createJobPost);

export default jobPostRouter;
