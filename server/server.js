import app from "./src/app.js";
import dotenv from "dotenv";
import dbconnect from "./src/config/dbconnect.js";
import config from "./src/config/config.js";
dotenv.config();

dbconnect();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});