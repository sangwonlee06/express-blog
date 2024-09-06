import profileModel from "../models/profileModel.js";

const createProfile = async (req, res) => {
    const { about, company, position, website, location, status, skills } = req.body;

    const existingProfile = await profileModel.findOne({ user: req.user._id });
    if (existingProfile) {
        return res.status(400).json({
            success: false,
            message: "Profile already exists",
        });
    }

    const profileFields = {};
    profileFields.user = req.user._id;
    if (about) profileFields.about = about;
    if (company) profileFields.company = company;
    if (position) profileFields.position = position;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills;

    if (typeof skills !== "undefined") {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    const newProfile = new profileModel(profileFields);
    const profile = await newProfile.save();

    if (!profile) {
        return res.status(400).json({
            success: false,
            message: "Failed to create profile",
        });
    }

    res.status(201).json({
        success: true,
        data: profile,
    });
};

const getProfile = async (req, res) => {
    const profile = await profileModel
        .findOne({ user: req.user._id })
        .populate("user", ["username", "email", "profileImage"]);
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
    const { about, company, position, website, location, status, skills } = req.body;

    const profile = await profileModel.findOne({ user: req.user._id });

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
    }

    const profileFields = {};
    if (about) profile.about = about;
    if (company) profile.company = company;
    if (position) profile.position = position;
    if (website) profile.website = website;
    if (location) profile.location = location;
    if (status) profile.status = status;
    if (skills) profile.skills = skills;

    if (typeof skills !== "undefined") {
        profile.skills = skills.split(",").map(skill => skill.trim());
    }

    const updatedProfile = await profile.save();

    if (!updatedProfile) {
        return res.status(400).json({
            success: false,
            message: "Failed to update profile",
        });
    }

    res.status(200).json({
        success: true,
        data: updatedProfile,
    });
};

const deleteProfile = async (req, res) => {
    const profile = await profileModel.findOneAndDelete({ user: req.user._id });

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
