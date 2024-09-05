import express from 'express';
const router = express.Router();
import passport from "passport";
import {
    createUser,
    signInUser,
    getUserInfoByToken,
} from "../controllers/authController.js";

const authChecker = passport.authenticate('jwt', { session: false })

// @Route   POST api/user/signup
// @desc    Sign up a new user (signup)
// @access  Public
router.post("/signup", createUser);

// @Route   POST api/user/signin
// @desc    Sign in a user (login)
// @access  Public
router.post("/signin", signInUser);

// @Route   GET api/user/current
// @desc    Get user info by JWT
// @access  Private
router.get("/me", authChecker, getUserInfoByToken);

export default router;