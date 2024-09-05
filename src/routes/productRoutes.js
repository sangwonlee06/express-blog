import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/productController.js";
const router = express.Router();

// @Route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", getAllProducts)

// @Route   GET api/products/:productId
// @desc    Get a product by ID
// @access  Public
router.get("/:productId", getProductById)

// @Route   POST api/products
// @desc    Create a new product
// @access  Public
router.post("/", createProduct)

// @Route   PUT api/products/:productId
// @desc    Update a product by ID
// @access  Public
router.put("/:productId", updateProduct)

// @Route   DELETE api/products/:productId
// @desc    Delete a product by ID
// @access  Public
router.delete("/:productId", deleteProduct)

export default router;
