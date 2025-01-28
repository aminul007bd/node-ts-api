import { createUser, getUsers } from "../controllers/userController";

import express from "express";
import { getAllRoles } from "../controllers/userRoleController";

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
userRouter.get("/users", getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRouter.post("/users", createUser);

/**
 * @swagger
 * /userRole:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
userRouter.get("/userRole", getAllRoles);

export default userRouter;

