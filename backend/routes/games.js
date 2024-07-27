import express from "express";
import bodyParser from "body-parser"; //TODO find solution without body-parser
import { getGames, getGame, createGame, updateGame, deleteGame } from "../controllers/gameController.js";

const jsonParser = bodyParser.json(); 
export const gameRoutes = express.Router();

// GET all games
gameRoutes.get("/", getGames);

// GET a single game
gameRoutes.get("/:id", getGame);

// POST a new game
gameRoutes.post("/", jsonParser, createGame);

// PATCH a game
gameRoutes.patch("/:id", jsonParser, updateGame);

// DELETE a game
gameRoutes.delete("/:id", deleteGame);