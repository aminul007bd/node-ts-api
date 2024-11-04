// Question: Write a Node.js API endpoint to fetch a list of users from a mock data source and return it as JSON. Use TypeScript for type safety and express for handling requests.
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

app.get("/api/users", (req: Request, res: Response) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
