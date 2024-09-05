import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/database.js';
import productRoutes from './routes/productRoutes.js';
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

(async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
})();

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use('/products', productRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});