import { createUser, getUsers } from "../controllers/userController";

import express from "express";
import { getAllRoles } from "../controllers/userRoleController";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);
userRouter.get("/userRole", getAllRoles);

export default userRouter;
