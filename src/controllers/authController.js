import * as authService from '../services/authService.js';

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const result = await authService.createUser({ username, email, password });

    if (result.error) {
        return res.status(409).json({
            success: false,
            message: result.error,
        });
    }

    res.status(201).json({
        success: true,
        data: result,
    });
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.signInUser({ email, password });

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error,
        });
    }

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getUserInfoByToken = async (req, res) => {
    const result = await authService.getUserInfoByToken(req.user);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error,
        });
    }

    res.status(200).json({
        success: true,
        data: result,
    });
};

export { createUser, signInUser, getUserInfoByToken };
