import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    createProduct as createProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService
} from "../services/productService.js";

const getAllProducts = async (req, res) => {
    const products = await getAllProductsService();

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
    const product = await getProductByIdService(req.params.productId);

    if (!product) {
        return res.status(200).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
};

const createProduct = async (req, res) => {
    const { title, description, price, productImage } = req.body;

    const product = await createProductService({ title, description, price, productImage });

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

    const updatedProduct = await updateProductService(req.params.productId, { title, description, price, productImage });

    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        data: updatedProduct
    });
};

const deleteProduct = async (req, res) => {
    const product = await deleteProductService(req.params.productId);

    if (!product) {
        return res.status(200).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
