// Question: Create an endpoint to retrieve all posts for a specific user.

app.get("/api/users/:userId/posts", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByPk(userId, { include: [Post] });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user.posts);
});
