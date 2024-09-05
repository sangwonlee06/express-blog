import express from 'express';
const router = express.Router();

import productModel from "../models/productModel.js";

router.get("/", async (req, res) => {
    const products = await productModel.find().sort({ date: -1 });

    if (products.length === 0) {
        return res.status(404).json({
            message: "No Products Found",
        });
    }
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

router.get("/:productId", (req, res) => {
    productModel
        .findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json({
                success: true,
                data: product
            });
        })
        .catch(err => res.status(400).json({
            success: false,
            error: err.message
        }));
});

router.post("/create", (req, res) => {
    const { title, description, price, productImage } = req.body;

    const newProduct = new productModel({
        title, description, price, productImage
    });

    newProduct
        .save()
        .then(product => {
            res.status(201).json({
                success: true,
                data: product
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                error: err.message
            });
        });
});

router.put("/:productId", async (req, res) => {
    const { title, description, price, productImage } = req.body;

    const product = await productModel.findById(req.params.productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (productImage) product.productImage = productImage;

    const updatedProduct = await product.save();
    res.status(200).json({
        success: true,
        data: updatedProduct
    });
});

router.delete("/:productId", (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Product deleted",
                data: product
            });
        })
        .catch(err => res.status(400).json({
            success: false,
            error: err.message
        }));
});

export default router;
