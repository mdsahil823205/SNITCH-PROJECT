import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/config.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// google auth start
passport.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    scope: ["email", "profile"]
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))
// google auth end

// auth routes start
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);
// auth routes end

// product routes start
import productRouter from "./routes/product.routes.js";
app.use("/api/product", productRouter);
// product routes end

export default app