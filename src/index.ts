import express, { Request, Response } from "express";

import checkDbConnection from "./checkDbConnection";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerConfig";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/userRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(userRouter);

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


