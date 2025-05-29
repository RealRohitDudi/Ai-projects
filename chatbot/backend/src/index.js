import express from "express";
import cors from "cors";
import "dotenv/config";
import chatRouter from "./routes/chat.routes.js";

const app = express();
app.use(express.json());

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Origin, X-Requested-With,Content-Type,Accept");
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173", // Your React app
    credentials: true, // Allow cookies / auth headers
  })
);
app.use("/api/chat", chatRouter);

app.listen(8000, () => {
  console.log("Backend is listening on port 8000");
});
