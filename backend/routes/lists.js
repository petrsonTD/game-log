import express from "express";
import bodyParser from "body-parser"; //TODO find solution without body-parser
import {
    getListGames,
    // getListGame,
    addGameToUsersList,
    updateListGameStatus,
    deleteGameFromUsersList
} from "../controllers/listGameController.js";
import { checkAuthMiddleware } from "../utils/auth.js";

const jsonParser = bodyParser.json();
export const listRoutes = express.Router();

// Authentification middleware
listRoutes.use(checkAuthMiddleware);

// GET all listGames
listRoutes.get("/", getListGames);

// // GET a single listGame
// listRoutes.get("/:id", getListGame);

// POST add new game to user's list
listRoutes.post("/", jsonParser, addGameToUsersList);

// PATCH uppdate status of user's game in list
listRoutes.patch("/", jsonParser, updateListGameStatus);

// DELETE delete game from user's list
listRoutes.delete("/:gameId", deleteGameFromUsersList);
