import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthanticated from "../middleware/isAuthanticated.js";

const router = express.Router();

router.route(`/send/:id`).post(isAuthanticated,sendMessage);

router.route(`/:id`).get(isAuthanticated, getMessage)

export default router;

// 19/04/2025 video 1:45:45 