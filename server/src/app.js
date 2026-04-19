import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// auth routes start
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);
// auth routes end

export default app