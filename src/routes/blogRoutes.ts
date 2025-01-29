import { createBlog, getBlogs } from "../controllers/blogController";

import express from "express";

const blogRouter = express.Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.post("/blogs", createBlog);

export default blogRouter;
