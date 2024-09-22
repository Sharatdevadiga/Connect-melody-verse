import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import protect from "../middlewares/protect.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", protect, logout);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
