import express from "express";
import {
    getLeaderboard,
    updateLeaderboardEntry,
} from "../controllers/leaderboard.controllers.js";
import { headMiddleware } from "../middlewares/isHeadExec.js";
const router = express.Router();

router.get("/", getLeaderboard);
router.patch("/:id", headMiddleware, updateLeaderboardEntry);

export default router;
