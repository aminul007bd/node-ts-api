// Question: Write an API that processes concurrent requests in a queue to avoid overloading the server.
import Queue from "bull";

const requestQueue = new Queue("requests");

requestQueue.process(async (job) => {
  // Simulate processing
  await performTask(job.data);
});

app.post("/api/process", (req: Request, res: Response) => {
  requestQueue.add(req.body);
  res.json({ message: "Request added to the queue" });
});

async function performTask(data: any) {
  // Task logic here
}
