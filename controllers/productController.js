import productModel from "../models/productModel.js";

const getAllProducts = async (req, res) => {
    // console.log("product total get");

    const products = await productModel.find().sort({date: -1});

    if (products.length === 0) {
        return res.status(200).json({
            message: "No products found",
        });
    }
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });

    // The above is much more intuitive than the below.
    // It is asynchronous and improves readability.
    //
    // productModel
    //     .find()
    //     .sort({ date: -1})
    //     .then(products => {
    //         if (products.length === 0) {
    //             return res.status(200).json({
    //                 message: "No products found",
    //             });
    //         }
    //         return res.status(200).json({
    //             count: products.length,
    //             products
    //         });
    //     })
    //     .catch(err => {
    //         res.status(404).json(err);
    // });
}

const getProductById = async (req, res) => {
    productModel
        .findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(200).json({
                    message: "Product not found"
                });
            }
            res.status(200).json(product);
        })
        .catch(err => res.status(404).json(err));
}

const createProduct = async (req, res) => {
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
            res.status(400).json(err);
        });
}

const updateProduct = async (req, res) => {
    const {title, description, price, productImage} = req.body;

    const product = await productModel.findById(req.params.productId);

    if (!product) {
        return res.status(404).json({success: false, message: "Product not found"});
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (productImage) product.productImage = productImage;

    const updatedProduct = await product.save();
    res.status(200).json({success: true, data: updatedProduct});
}

const deleteProduct = async (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(200).json({
                    message: "Product not found"
                });
            }
            res.status(200).json(product);
        })
        .catch(err => res.status(404).json(err));
}

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
