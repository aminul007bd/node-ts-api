// Question: Implement CORS (Cross-Origin Resource Sharing) in your Node.js app to allow requests from any origin.
import cors from "cors";

app.use(cors());

// Question: Write a health check endpoint that returns a 200 status and a simple message to verify the server is running.

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy" });
});
