import { response_200, response_500 } from "../utils/responseCodes.js";
import fixtureRouter from "./fixtures.routes.js";
import leaderboardRouter from "./leaderboard.routes.js";
import empLeaderboardRouter from "./empLeaderboard.routes.js";
import resultsRouter from "./results.routes.js";
import authRouter from "./auth.routes.js";
import logRouter from "./log.routes.js";
import teamAsmitaRouter from "./teamAsmita.routes.js";
import eventRouter from "./events.routes.js";
import aboutRouter from "./about.routes.js";
import galleryRouter from "./gallery.routes.js";
import notificationRouter from "./noti.routes.js";
import express from "express";
import {
    executiveMiddleware,
    headMiddleware,
} from "../middlewares/isHeadExec.js";

const router = express.Router();

router.get("/", (req, res) => {
    response_200(res, "API is up and running.");
});
router.use("/fixtures", fixtureRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/emp/leaderboard", empLeaderboardRouter);
router.use("/auth", authRouter);
router.use("/results", resultsRouter);
router.use("/logs", headMiddleware, logRouter);
router.use("/teamAsmita", teamAsmitaRouter);
router.use("/events", eventRouter);
router.use("/about", aboutRouter);
router.use("/gallery", galleryRouter);
router.use("/noti", notificationRouter);

export default router;
