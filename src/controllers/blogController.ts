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

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      res
        .status(400)
        .json({ error: "Title, content, and authorId are required" });
      return;
    }

    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    blog.title = title;
    blog.content = content;
    blog.authorId = authorId;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);

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

    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    await blog.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};