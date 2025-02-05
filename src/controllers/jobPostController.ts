import { Request, Response } from "express";

import JobPost from "../models/jobPost";

export const getJobPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobPosts = await JobPost.findAll();
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ error: "Failed to fetch job posts" });
  }
};

export const createJobPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, location, salaryRange } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: "Title and description are required" });
      return;
    }

    const newJobPost = await JobPost.create({
      title,
      description,
      location,
      salaryRange,
    });
    res.status(201).json(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create job post" });
  }
};

export const updateJobPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, location, salaryRange } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: "Title and description are required" });
      return;
    }

    const jobPost = await JobPost.findByPk(id);
    if (!jobPost) {
      res.status(404).json({ error: "Job post not found" });
      return;
    }

    jobPost.title = title;
    jobPost.description = description;
    jobPost.location = location;
    jobPost.salaryRange = salaryRange;
    await jobPost.save();

    res.status(200).json(jobPost);
  } catch (error) {
    console.error("Error updating job post:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to update job post" });
  }
};

export const deleteJobPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const jobPost = await JobPost.findByPk(id);
    if (!jobPost) {
      res.status(404).json({ error: "Job post not found" });
      return;
    }

    await jobPost.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job post:", error);
    res.status(500).json({ error: "Failed to delete job post" });
  }
};