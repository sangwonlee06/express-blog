import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET /product/ - Fetching all products");
    res.status(200).send("Fetched all products");
});

router.get("/:productId", (req, res) => {
    console.log(`GET /product/${req.params.productId} - Fetching product with ID: ${req.params.productId}`);
    res.status(200).send(`Fetched product with ID: ${req.params.productId}`);
});

router.post("/create", (req, res) => {
    console.log("POST /product/create - Creating a new product");
    res.status(201).send("Created a new product");
});

router.put("/:productId", (req, res) => {
    console.log(`PUT /product/${req.params.productId} - Updating product with ID: ${req.params.productId}`);
    res.status(200).send(`Updated product with ID: ${req.params.productId}`);
});

router.delete("/:productId", (req, res) => {
    console.log(`DELETE /product/${req.params.productId} - Deleting product with ID: ${req.params.productId}`);
    res.status(200).send(`Deleted product with ID: ${req.params.productId}`);
});

export default router;
``