import { Request, Response } from "express";

import Contact from "../models/contact";

export const getContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const createContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required" });
      return;
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to create contact" });
  }
};

export const updateContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required" });
      return;
    }

    const contact = await Contact.findByPk(id);
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    contact.name = name;
    contact.email = email;
    contact.message = message;
    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);

    if (error instanceof Error) {
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ error: "Validation error", details: (error as any).errors });
        return;
      }
    }

    res.status(500).json({ error: "Failed to update contact" });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    await contact.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
