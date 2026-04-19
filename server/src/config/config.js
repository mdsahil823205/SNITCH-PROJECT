import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables")
}

if (!process.env.PORT) {
    throw new Error("PORT is not defined in the environment variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables")
}
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in the environment variables")
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in the environment variables")
}
if (!process.env.GOOGLE_CALLBACK_URI) {
    throw new Error("GOOGLE_CALLBACK_URI is not defined in the environment variables")
}

const config = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
    jwt_secret: process.env.JWT_SECRET,
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URI
    }

}

export default config