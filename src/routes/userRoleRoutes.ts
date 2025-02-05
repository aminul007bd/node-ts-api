import {
  createRole,
  getAllRoles,
  updateRole,
} from "../controllers/userRoleController";

import { Router } from "express";

const userRoleRouter = Router();

userRoleRouter.get("/userRole", getAllRoles);
userRoleRouter.post("/userRole", createRole);
userRoleRouter.put("/userRole/:id", updateRole);
userRoleRouter.delete("/userRole/:id", updateRole);

export default userRoleRouter;
