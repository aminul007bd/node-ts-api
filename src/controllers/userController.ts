import { Request, Response } from "express";

import User from "../models/user";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, passwordHash, roleId } = req.body;

    if (!firstName || !lastName || !email || !passwordHash || !roleId) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      roleId,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ error: "Invalid roleId" });
        return;
      }

      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, passwordHash, roleId } = req.body;

    if (!firstName || !lastName || !email || !passwordHash || !roleId) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.passwordHash = passwordHash;
    user.roleId = roleId;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({ error: "Invalid roleId" });
        return;
      }

      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to update user" });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};