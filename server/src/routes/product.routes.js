import express from "express";
import authenticateSeller from "../middleware/auth.middleware.js";
import multer from "multer"
import { createProduct, getAllProducts } from "../controller/product.controller.js";
import productValidator from "../validator/product.validator.js";
const productRouter = express.Router();
// multer configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024// 5MB
    }
})

/**
 * @description create product
 * @route POST /api/product/
 * @access Private
 **/
productRouter.post("/", authenticateSeller, upload.array("images", 7), productValidator, createProduct)
/**
 * @description get all products
 * @route GET /api/product/seller
 * @access Private
 **/
productRouter.get("/seller",authenticateSeller,getAllProducts)



export default productRouter;