import express from "express";
import { registerController, loginController, logoutController, getMeController } from "../controller/auth.controller.js";

const authRouter = express.Router();
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
**/
if (!registerController) {
    console.log("registerController is not defined");
    throw new Error("registerController is not defined");
}
authRouter.post("/register", registerController);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 **/
if (!loginController) {
    console.log("loginController is not defined");
    throw new Error("loginController is not defined");
}
authRouter.post("/login", loginController);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout a user
 * @access  Private
 **/
if (!logoutController) {
    console.log("logoutController is not defined");
    throw new Error("logoutController is not defined");
}
authRouter.post("/logout", logoutController);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 **/
if (!getMeController) {
    console.log("getMeController is not defined");
    throw new Error("getMeController is not defined");
}
authRouter.get("/me", getMeController);

export default authRouter;