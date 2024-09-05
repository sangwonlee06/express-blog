import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getAllProducts)

router.get("/:productId", getProductById)

router.post("/", createProduct)

router.put("/:productId", updateProduct)

router.delete("/:productId", deleteProduct)

export default router;
