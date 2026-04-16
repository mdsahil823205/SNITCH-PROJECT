import userModel from "../model/user.model.js";
import generateToken from "../utlis/token.js";
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerController = async (req, res) => {
    const { email, password, fullName, contact } = req.body;
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
        contact
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
//..............................................................................................
// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public





















const loginController = (req, res) => {
    res.send("Login");
}
const logoutController = (req, res) => {
    res.send("Logout");
}
const getMeController = (req, res) => {
    res.send("Get Me");
}

export { registerController, loginController, logoutController, getMeController }