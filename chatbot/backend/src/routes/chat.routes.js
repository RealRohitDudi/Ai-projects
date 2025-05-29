import express from "express";
import { Router } from "express";
const router = Router();

import { askOpenai, askGemini } from "../controllers/chat.controller.js";

router.route("/openai").post(askOpenai);
router.route("/gemini").post(askGemini);
export default router;
