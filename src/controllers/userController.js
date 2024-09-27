import * as userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    if (!users || users.length === 0) {
        return res.status(200).json({
            message: "No users found",
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId);

    if (!user) {
        return res.status(404).json({
            message: "No user found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.params.userId, req.body);

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        });
    }

    res.status(200).json({
        success: true,
        data: updatedUser
    });
};

const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.userId);

    if (!user) {
        return res.status(404).json({
            message: "No user found"
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};

export { getAllUsers, getUserById, updateUser, deleteUser };
