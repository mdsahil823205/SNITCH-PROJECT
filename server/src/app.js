import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth routes start
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);
// auth routes end

export default app