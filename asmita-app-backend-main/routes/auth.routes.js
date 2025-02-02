import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
