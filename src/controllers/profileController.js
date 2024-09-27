import * as profileService from '../services/profileService.js';

const createProfile = async (req, res) => {
    const result = await profileService.createProfile(req.user._id, req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error,
        });
    }

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getProfile = async (req, res) => {
    const profile = await profileService.getProfile(req.user._id);

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
    }

    res.status(200).json({
        success: true,
        data: profile,
    });
};

const updateProfile = async (req, res) => {
    const updatedProfile = await profileService.updateProfile(req.user._id, req.body);

    if (!updatedProfile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
    }

    res.status(200).json({
        success: true,
        data: updatedProfile,
    });
};

const deleteProfile = async (req, res) => {
    const profile = await profileService.deleteProfile(req.user._id);

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Profile deleted successfully",
        data: profile,
    });
};

export { createProfile, getProfile, updateProfile, deleteProfile };
