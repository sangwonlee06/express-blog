import userModel from "../models/userModel.js";

export const getAllUsers = async () => {
    const users = await userModel.find().sort({ date: -1 });
    return users;
};

export const getUserById = async (userId) => {
    const user = await userModel.findById(userId);
    return user;
};

export const updateUser = async (userId, { username, email, password }) => {
    const user = await userModel.findById(userId);
    if (!user) return null;

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    const updatedUser = await user.save();
    return updatedUser;
};

export const deleteUser = async (userId) => {
    const user = await userModel.findByIdAndDelete(userId);
    return user;
};
