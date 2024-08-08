import express from "express";
import { getGenres } from "../controllers/genreController.js";

export const genreRoutes = express.Router();

// GET all genres
genreRoutes.get("/", getGenres);
