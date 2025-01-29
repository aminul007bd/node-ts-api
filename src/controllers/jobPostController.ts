import { Request, Response } from "express";

import JobPost from "../models/jobPost";

export const getJobPosts = async (req: Request, res: Response) => {
  try {
    const jobPosts = await JobPost.findAll();
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job posts" });
  }
};

export const createJobPost = async (req: Request, res: Response) => {
  try {
    const { title, description, location, salaryRange } = req.body;
    const newJobPost = await JobPost.create({
      title,
      description,
      location,
      salaryRange,
    });
    res.status(201).json(newJobPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job post" });
  }
};
