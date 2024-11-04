// Question: Use an in-memory cache to store frequent API responses and reduce database calls.

import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  const cachedUser = cache.get(userId);
  if (cachedUser) {
    return res.json(cachedUser);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  cache.set(userId, user); // Cache the user data
  res.json(user);
});
