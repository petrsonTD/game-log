import express from "express";
import bodyParser from "body-parser"; //TODO find solution without body-parser
import { getGames, getGame, createGame, updateGame, deleteGame } from "../controllers/gameController.js";
import { checkAuthMiddleware } from "../utils/auth.js";

const jsonParser = bodyParser.json(); 
export const gameRoutes = express.Router();

// GET all games
gameRoutes.get("/", getGames);

// GET a single game
gameRoutes.get("/:id", getGame);

// Authentification middleware
gameRoutes.use(checkAuthMiddleware);

// PATCH a game
gameRoutes.patch("/", jsonParser, updateGame);

// POST a new game
gameRoutes.post("/", jsonParser, createGame);

// DELETE a game
gameRoutes.delete("/:id", deleteGame);
