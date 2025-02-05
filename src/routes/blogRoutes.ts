import { createBlog, getBlogs } from "../controllers/blogController";

import express from "express";

const blogRouter = express.Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.post("/blogs", createBlog);
blogRouter.put("/blogs/:id", createBlog);
blogRouter.delete("/blogs/:id", createBlog);

export default blogRouter;
