import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    getUserById,
} from "../controllers/userController.js";

// @Route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", getAllUsers);

// @Route   GET api/users/:userId
// @desc    Get a user by ID
// @access  Public
router.get("/:userId", getUserById);

export default router;
