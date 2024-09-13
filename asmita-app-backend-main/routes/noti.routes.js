import express from "express";
import { sendNoti } from "../controllers/noti.controllers.js";
import { allMiddleware } from "../middlewares/isHeadExec.js";
const router = express.Router();

router.post("/sendnoti", allMiddleware, sendNoti)

export default router