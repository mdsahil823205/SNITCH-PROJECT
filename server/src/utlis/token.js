import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (user) => {
    return jwt.sign({ id: user._id || user.id }, config.jwt_secret, { expiresIn: "1d" })
}

export default generateToken;