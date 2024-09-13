import { getGallery } from "../controllers/gallery.controllers.js";
import express from "express";

const router = express.Router();

router.get("/", getGallery);
export default router;
