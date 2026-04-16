import mongoose from "mongoose";
import config from "./config.js";
const dbconnect = async () => {
    try {
        await mongoose.connect(config.mongodb_uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export default dbconnect;