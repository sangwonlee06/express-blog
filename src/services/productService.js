import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
    const products = await productModel.find().sort({ date: -1 });
    return products;
};

export const getProductById = async (productId) => {
    const product = await productModel.findById(productId);
    return product;
};

export const createProduct = async ({ title, description, price, productImage }) => {
    const newProduct = new productModel({
        title,
        description,
        price,
        productImage
    });
    const product = await newProduct.save();
    return product;
};

export const updateProduct = async (productId, { title, description, price, productImage }) => {
    const product = await productModel.findById(productId);
    if (!product) return null;

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (productImage) product.productImage = productImage;

    const updatedProduct = await product.save();
    return updatedProduct;
};

export const deleteProduct = async (productId) => {
    const product = await productModel.findByIdAndDelete(productId);
    return product;
};
