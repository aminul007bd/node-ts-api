import { Request, Response } from "express";

import Blog from "../models/blog";

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      res
        .status(400)
        .json({ error: "Title, content, and authorId are required" });
      return;
    }

    const newBlog = await Blog.create({ title, content, authorId });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ error: "Invalid authorId" });
        return;
      }

      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create blog" });
  }
};
