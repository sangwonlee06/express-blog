import express from 'express';
import passport from "passport";
const router = express.Router();
import { createProfile, getProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";

const authChecker = passport.authenticate('jwt', { session: false });

router.post("/", authChecker, createProfile);
router.get("/", authChecker, getProfile);
router.put("/", authChecker, updateProfile);
router.delete("/", authChecker, deleteProfile);

export default router;
