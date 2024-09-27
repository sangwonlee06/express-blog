import dotenv from 'dotenv';
dotenv.config(); // This has to be called before other imports

import express from 'express';
import connectDB from './src/config/database.js';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import passport from 'passport';
import authenticate from './src/utils/authenticate.js';
import errorHandler from "./src/middleware/errorHandler.js";

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
app.use(passport.initialize());
authenticate(passport);  // Register the JWT strategy

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profiles', profileRoutes)

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});