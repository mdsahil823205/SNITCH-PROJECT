import productModel from "../model/product.model.js";
import uploadFile from "../service/storage.service.js";
/**
 * @description create product
 * @route POST /api/product/
 * @access Private
 **/
export const createProduct = async (req, res) => {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        if (!title || !description || !priceAmount || !priceCurrency) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        if (priceAmount <= 0) {
            return res.status(400).json({ message: "Price amount should be greater than 0", success: false });
        }
        if (priceCurrency !== "INR" && priceCurrency !== "USD" && priceCurrency !== "EUR") {
            return res.status(400).json({ message: "Invalid currency", success: false });
        }
        const seller = req.user || req.user.id;
        const images = req.files;
        if (!images) {
            return res.status(400).json({ message: "Images are required", success: false });
        }
        if (images.length > 7) {
            return res.status(400).json({ message: "images should be less than or equal to 7", success: false });
        }
        const uploadImages = await Promise.all(
            images.map(async (file) => {
                return await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname,
                    folder: "SNITCH",
                });
            }),
        );
        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency,
            },
            image: uploadImages,
            seller: seller.id,
        });
        return res
            .status(201)
            .json({
                message: "Product created successfully",
                success: true,
                product,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

/**
 * @description get all products
 * @route GET /api/product/seller
 * @access Private
 **/
export const getAllProducts = async (req, res) => {
    const seller = req.user || req.user.id
    const products = await productModel.find({ seller })
    return res.status(200).json({ message: "Products fetched successfully", success: true, products })
}
