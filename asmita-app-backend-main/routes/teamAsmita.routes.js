import { getTeamAsmita } from "../controllers/teamAsmita.controllers.js";
import express from "express";

const router = express.Router();

router.get("/", getTeamAsmita);
export default router;
