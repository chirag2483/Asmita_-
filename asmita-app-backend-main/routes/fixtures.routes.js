import {
    createFixture,
    deleteFixture,
    getAllFixtures,
    getByDay,
    getBySport,
    getUpcomingFixtures,
    updateFixture,
} from "../controllers/fixtures.controllers.js";
import { allMiddleware } from "../middlewares/isHeadExec.js";
import express from "express";

const router = express.Router();

router.get("/", getAllFixtures);
router.get("/upcoming", getUpcomingFixtures);
router.get("/:sport", getBySport);
router.get("/:sport/:day", getByDay);
router.post("/create", allMiddleware, createFixture);
router.delete("/:id", allMiddleware, deleteFixture);
router.patch("/:id", allMiddleware, updateFixture);

export default router;
