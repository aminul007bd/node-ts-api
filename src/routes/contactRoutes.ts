import { createContact, getContacts } from "../controllers/contactController";

import express from "express";

const contactRouter = express.Router();

contactRouter.get("/contacts", getContacts);
contactRouter.post("/contacts", createContact);

export default contactRouter;
