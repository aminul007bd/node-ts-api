// Question: Write an endpoint to return a paginated list of users, with sorting capabilities by name or creation date.
app.get("/api/users", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = (req.query.sort as string) || "name";

  const offset = (page - 1) * limit;
  const users = await User.findAll({
    limit,
    offset,
    order: [[sort, "ASC"]],
  });

  res.json({ users, page, limit });
});
