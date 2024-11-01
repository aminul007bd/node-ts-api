import express, { Request, Response } from "express";

import userRouter from "./routes/userRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to node api");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`);
});
