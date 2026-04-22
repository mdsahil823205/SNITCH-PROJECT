import usermodel from "../model/user.model.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js";
const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("unauthorized please login first")
        }
        const decodedToken = jwt.verify(token, config.jwt_secret)
        const user = await usermodel.findById(decodedToken.id)
        if (!user) {
            return res.status(401).json("unauthorized user not found")
        }
        if (user.role !== "seller") {
            return res.status(403).json("forbidden")
        }
        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
export default authenticateSeller