import { createContact, getContacts } from "../controllers/contactController";

import express from "express";

const contactRouter = express.Router();

contactRouter.get("/contacts", getContacts);
contactRouter.post("/contacts", createContact);
contactRouter.put("/contacts/:id", createContact);
contactRouter.delete("/contacts/:id", createContact);

export default contactRouter;
