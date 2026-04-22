import express from "express";
import authenticateSeller from "../middleware/auth.middleware.js";
import multer from "multer"
import { createProduct } from "../controller/product.controller.js";
import productValidator from "../validator/product.validator.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024// 5MB
    }
})

const productRouter = express.Router();
productRouter.post("/", authenticateSeller, upload.array("images", 7), productValidator, createProduct)



export default productRouter;