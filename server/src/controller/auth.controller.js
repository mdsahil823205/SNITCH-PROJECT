import userModel from "../model/user.model.js";
import generateToken from "../utlis/token.js";
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
    return res.status(201).json({
        message: "User created successfully",
        user,
        token
    })
}





















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