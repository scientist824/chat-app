import express from "express";
import {
  login,
  logout,
  register,
  getOtherUser

} from "../controllers/userController.js";
import isAuthanticated from "../middleware/isAuthanticated.js";

const router = express.Router();

router.route(`/register`).post(register);

router.route(`/login`).post(login);

router.route(`/logout`).get(logout);

router.route(`/`).get(isAuthanticated,getOtherUser);

export default router;
