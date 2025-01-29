import { Request, Response } from "express";

import Contact from "../models/contact";

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};
