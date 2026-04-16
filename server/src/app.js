import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// auth routes start
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);
// auth routes end

export default app