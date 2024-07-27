import express from "express";
import bodyParser from "body-parser"; //TODO find solution without body-parser
import { login, signup } from "../controllers/authController.js";

const jsonParser = bodyParser.json(); 
export const authRoutes = express.Router();

// GET all games
authRoutes.post("/", jsonParser, login);

// GET a single game
authRoutes.post("/signup", jsonParser, signup);
