import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: "John Doe" }]);
};

export const createUser = (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ id: 2, name });
};
