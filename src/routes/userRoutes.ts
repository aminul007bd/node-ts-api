import { createUser, getUsers } from "../controllers/userController";

import express from "express";
import { getAllRoles } from "../controllers/userRoleController";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);
userRouter.get("/userRole", getAllRoles);
userRouter.put("/users/:id", createUser);
userRouter.delete("/users/:id", createUser);

export default userRouter;
