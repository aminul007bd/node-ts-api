// Question: Set up WebSocket support in your Node.js app, and create an HTTP endpoint that broadcasts messages to all connected clients.
import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/api/broadcast", (req: Request, res: Response) => {
  const { message } = req.body;
  io.emit("broadcast", message);
  res.json({ message: "Message broadcasted" });
});

server.listen(3000, () => console.log("Server running on port 3000"));
