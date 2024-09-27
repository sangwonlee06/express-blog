import profileModel from "../models/profileModel.js";

export const createProfile = async (userId, { about, company, position, website, location, status, skills }) => {
    const existingProfile = await profileModel.findOne({ user: userId });
    if (existingProfile) {
        return { error: "Profile already exists" };
    }

    const profileFields = { user: userId };
    if (about) profileFields.about = about;
    if (company) profileFields.company = company;
    if (position) profileFields.position = position;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    const newProfile = new profileModel(profileFields);
    const profile = await newProfile.save();

    return profile;
};

export const getProfile = async (userId) => {
    const profile = await profileModel
        .findOne({ user: userId })
        .populate("user", ["username", "email", "profileImage"]);
    return profile;
};

export const updateProfile = async (userId, { about, company, position, website, location, status, skills }) => {
    const profile = await profileModel.findOne({ user: userId });
    if (!profile) return null;

    if (about) profile.about = about;
    if (company) profile.company = company;
    if (position) profile.position = position;
    if (website) profile.website = website;
    if (location) profile.location = location;
    if (status) profile.status = status;
    if (skills) {
        profile.skills = skills.split(",").map(skill => skill.trim());
    }

    const updatedProfile = await profile.save();
    return updatedProfile;
};

export const deleteProfile = async (userId) => {
    const profile = await profileModel.findOneAndDelete({ user: userId });
    return profile;
};
