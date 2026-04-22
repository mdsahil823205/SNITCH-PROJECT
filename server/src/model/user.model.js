import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: function () {
                return this.googleId ? false : true;
            },
            select: false,
        },
        fullName: { type: String, required: true },
        contact: {
            type: String,
            required: function () {
                return this.googleId ? false : true;
            },
        },
        role: {
            type: String,
            enum: ["buyer", "seller"],
            default: "buyer",
        },
        profilePic: { type: String, default: "" },
        googleId: { type: String, default: "" },
    },
    { timestamps: true },
);
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
});
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
