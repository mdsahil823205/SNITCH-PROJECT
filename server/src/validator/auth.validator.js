import { body, validationResult } from "express-validator";
const validatorRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
export const registerValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .notEmpty()
        .withMessage("Email is required"),
    body("contact")
        .trim()
        .notEmpty()
        .withMessage("Contact is required")
        .matches(/^\d{10}$/)
        .withMessage("Contact must be a 10-digit number"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full Name is required")
        .isLength({ min: 3 })
        .withMessage("Full Name must be at least 3 characters"),
    validatorRequest,
];
