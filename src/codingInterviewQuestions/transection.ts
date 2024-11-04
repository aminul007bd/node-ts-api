// Question: Create an endpoint to create a new user and log the creation event in another table. Use a transaction to ensure atomicity.

import { EventLog, User } from "./models"; // Assume we have these models
import { Sequelize, Transaction } from "sequelize";

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    await Sequelize.transaction(async (t: Transaction) => {
      const newUser = await User.create({ name, email }, { transaction: t });
      await EventLog.create(
        { userId: newUser.id, event: "User created" },
        { transaction: t }
      );
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});
