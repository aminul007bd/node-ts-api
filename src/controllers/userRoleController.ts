import { Request, Response } from "express";

import UserRole from "../models/userRole";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await UserRole.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};
