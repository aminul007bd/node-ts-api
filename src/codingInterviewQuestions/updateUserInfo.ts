// Question: Write an endpoint to update an existing user's information by their ID. Use TypeScript to ensure type safety.
app.put("/api/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const updatedUser: User = { id: userId, name, email };
  users[userIndex] = updatedUser;

  res.json(updatedUser);
});
