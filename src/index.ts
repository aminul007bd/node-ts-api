import "./swaggerDocs"; // Import the Swagger documentation

import express, { Request, Response } from "express";

import blogRouter from "./routes/blogRoutes";
import checkDbConnection from "./checkDbConnection";
import contactRouter from "./routes/contactRoutes"; // Import contactRouter
import jobPostRouter from "./routes/jobPostRoutes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerConfig";
import swaggerUi from "swagger-ui-express";
import userRoleRouter from "./routes/userRoleRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(userRouter);
app.use(userRoleRouter);
app.use(blogRouter);
app.use(jobPostRouter);
app.use(contactRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to node api");
});

async function startServer() {
  await checkDbConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();
