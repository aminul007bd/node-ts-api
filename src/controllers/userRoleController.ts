import { Request, Response } from "express";

import UserRole from "../models/userRole";

export const getAllRoles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roles = await UserRole.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roleName, description } = req.body;

    if (!roleName) {
      res.status(400).json({ error: "Role name is required" });
      return;
    }

    const newRole = await UserRole.create({ roleName, description });
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create role" });
  }
};

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { roleName, description } = req.body;

    if (!roleName) {
      res.status(400).json({ error: "Role name is required" });
      return;
    }

    const role = await UserRole.findByPk(id);
    if (!role) {
      res.status(404).json({ error: "Role not found" });
      return;
    }

    role.roleName = roleName;
    role.description = description;
    await role.save();

    res.status(200).json(role);
  } catch (error) {
    console.error("Error updating role:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to update role" });
  }
};
