import express from "express";
import bodyParser from "body-parser"; //TODO find solution without body-parser
import { login, signup } from "../controllers/authController.js";

const jsonParser = bodyParser.json(); 
export const authRoutes = express.Router();

// POST login
authRoutes.post("/login", jsonParser, login);

// POST signup
authRoutes.post("/signup", jsonParser, signup);
