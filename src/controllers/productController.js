import productModel from "../models/productModel.js";

const getAllProducts = async (req, res) => {

    const products = await productModel.find().sort({ date: -1 });

    if (!products || products.length === 0) {
        return res.status(200).json({
            message: "No Products Found",
        });
    }

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
};

const getProductById = async (req, res) => {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
        return res.status(200).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
};

const createProduct = async (req, res) => {
    const { title, description, price, productImage } = req.body;

    const newProduct = new productModel({
        title,
        description,
        price,
        productImage
    });

    const product = await newProduct.save();

    if (!product) {
        return res.status(400).json({
            message: "Failed to create product"
        });
    }

    res.status(201).json({
        success: true,
        data: product
    });
};

const updateProduct = async (req, res) => {
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

    if (!updatedProduct) {
        return res.status(400).json({
            message: "Failed to update product"
        });
    }

    res.status(200).json({
        success: true,
        data: updatedProduct
    });
};

const deleteProduct = async (req, res) => {
    const product = await productModel.findByIdAndDelete(req.params.productId);

    if (!product) {
        return res.status(200).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
