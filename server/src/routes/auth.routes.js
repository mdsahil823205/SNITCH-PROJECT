import express from "express";
import { registerController, loginController, logoutController, getMeController } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
const authRouter = express.Router();
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
**/
authRouter.post("/register", registerValidator, registerController);

//..............................................................................................
/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 **/

authRouter.post("/login", loginValidator, loginController);

//..............................................................................................
/**
 * @route   POST /api/auth/logout
 * @desc    Logout a user
 * @access  Private
 **/

authRouter.post("/logout", logoutController);

//..............................................................................................
/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 **/
authRouter.get("/me", getMeController);

export default authRouter;