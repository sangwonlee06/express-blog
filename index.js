import dotenv from 'dotenv';
dotenv.config(); // This has to be called before other imports

import express from 'express';
import connectDB from './configs/database.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import passport from 'passport';
import authenticate from './configs/authenticate.js';
import errorHandler from "./middlewares/errorHandler.js";

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
app.use('/products', productRoutes);
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});