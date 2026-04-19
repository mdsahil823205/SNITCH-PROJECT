import app from "../app.js";
import userModel from "../model/user.model.js";
import generateToken from "../utlis/token.js";
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerController = async (req, res) => {
    try {
        const { email, password, fullName, contact, isSeller } = req.body;
        console.log(email, password, fullName, contact);
        // check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }]
        })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await userModel.create({
            email,
            password,
            fullName,
            contact,
            role: isSeller ? "seller" : "buyer"
        })
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true, // prevent client side js from accessing the cookie
            secure: false, // only send over HTTPS in production set true when deploying
            sameSite: "lax", // prevent CSRF attacks set strict when deploying
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        return res.status(201).json({
            message: "User created successfully",
            user,
            token
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
//..............................................................................................

// @desc    Google authentication callback
// @route   GET /google/callback
// @access  Public
export const googleAuthController = async (req, res) => {
    console.log(req.user)
    res.redirect("http://localhost:5173/")
}





//..............................................................................................
// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        // check if user exists by email only, explicitly selecting the password to compare
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        // check if password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true, // prevent client side js from accessing the cookie
            secure: false, // only send over HTTPS in production set true when deploying
            sameSite: "lax", // prevent CSRF attacks set strict when deploying
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        return res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}


const logoutController = (req, res) => {
    res.send("Logout");
}
const getMeController = (req, res) => {
    res.send("Get Me");
}

export { registerController, loginController, logoutController, getMeController }