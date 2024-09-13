import { getAbout } from "../controllers/about.controllers.js";
import express from "express";

const router = express.Router();

router.get("/", getAbout);
export default router;
