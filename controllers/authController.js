import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already in use"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const profileImage = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
    })

    const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        profileImage,
    });

    newUser
        .save()
        .then(user => {
            res.status(201).json({
                success: true,
                data: user
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne( { email })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Password is incorrect"
        })
    }

    const payload = { userId: user._id }
    const token = jwt.sign(payload,
        process.env.JWT_ACCESSTOKEN_SECRET || 'defaultSecretKey',
        { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION_TIME || '1h'}
    )

    return res.status(200).json({
        success: true,
        data: {user, token}
    })
}

const getUserInfoByToken = async (req, res) => {
    res.status(200).json({
        userInfo: req.user
    })
}

export { createUser, signInUser, getUserInfoByToken };