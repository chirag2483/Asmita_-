import { getEvents } from "../controllers/events.controllers.js";
import express from "express";

const router = express.Router();

router.get("/", getEvents);
export default router;
