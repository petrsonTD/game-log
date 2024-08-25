import express from "express";
import { getStatus } from "../controllers/statusController.js";

export const statusRoutes = express.Router();

// GET all status
statusRoutes.get("/", getStatus);
