import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.js";
import { gameRoutes } from "./routes/games.js";

const app = express();
const port = 4000; // Changed port to avoid conflict with React dev server

app.use(cors());
app.use("/api/login", authRoutes);
app.use("/api/games", gameRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});