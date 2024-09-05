import userModel from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    const users = await userModel.find().sort({ date: -1 });

    if (users.length === 0) {
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
    userModel
        .findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No user found"
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        })
        .catch(err => res.status(404).json(err));
};

const updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findById(req.params.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();
    res.status(200).json({
        success: true,
        data: updatedUser });
};

const deleteUser = async (req, res) => {
    userModel
        .findByIdAndDelete(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No user found"
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        })
        .catch(err => res.status(404).json(err));
};

export { getAllUsers, getUserById, updateUser, deleteUser };
