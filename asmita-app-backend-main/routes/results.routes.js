import express from "express";
import {
    createAthleteResultController,
    createCricketResultController,
    createFootballResultController,
    deleteAthleteResultController,
    deleteCricketResultController,
    deleteFootballResultController,
    getAthleticsResultsById,
    getCricketResultsById,
    getFootballResultsById,
    getResultsController,
    updateAtheleteResultController,
    updateCricketResultController,
    updateFootballResultController,
} from "../controllers/results.controllers.js";
import { allMiddleware } from "../middlewares/isHeadExec.js";
const router = express.Router();

router.get("/getresults", getResultsController);
router.get("/getresults/athletics/:id", getAthleticsResultsById);
router.get("/getresults/football/:id", getFootballResultsById);
router.get("/getresults/cricket/:id", getCricketResultsById);

router.post("/cricket", allMiddleware, createCricketResultController);
router.post("/football", allMiddleware, createFootballResultController);
router.post("/athletics", allMiddleware, createAthleteResultController);

router.patch("/cricket/:id", allMiddleware, updateCricketResultController);
router.patch("/football/:id", allMiddleware, updateFootballResultController);
router.patch("/athletics/:id", allMiddleware, updateAtheleteResultController);

router.delete("/cricket/:id", allMiddleware, deleteCricketResultController);
router.delete("/football/:id", allMiddleware, deleteFootballResultController);
router.delete("/athletics/:id", allMiddleware, deleteAthleteResultController);

export default router;
