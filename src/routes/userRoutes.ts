import { createUser, getUsers } from "../controllers/userController";

import express from "express";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);

export default userRouter;
