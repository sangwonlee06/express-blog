import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';

export const createUser = async ({ username, email, password }) => {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate gravatar profile image
    const profileImage = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
    });

    const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        profileImage,
    });

    const savedUser = await newUser.save();
    return savedUser;
};

export const signInUser = async ({ email, password }) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        return { error: "User not found" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return { error: "Password is incorrect" };
    }

    const payload = { userId: user._id };
    const token = jwt.sign(
        payload,
        process.env.JWT_ACCESSTOKEN_SECRET || 'defaultSecretKey',
        { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION_TIME || '1h' }
    );

    return { user, token };
};

export const getUserInfoByToken = async (user) => {
    if (!user) {
        return { error: "User not found" };
    }
    return user;
};
