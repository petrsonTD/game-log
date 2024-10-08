import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.js";
import { gameRoutes } from "./routes/games.js";
import { genreRoutes } from "./routes/genres.js";
import { listRoutes } from "./routes/lists.js";
import { statusRoutes } from "./routes/status.js";

const app = express();
const port = 4000; // Changed port to avoid conflict with React dev server

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/lists", listRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
