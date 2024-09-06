import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        about: {
            type: String,
            required: true,
            maxlength: 200,
            trim: true,
        },
        company: {
            type: String,
            default: "",
            trim: true,
        },
        position: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[a-z0-9\.:].*$/,
                "Please enter a valid URL",
            ],
            trim: true,
        },
        location: {
            type: String,
            default: "",
            trim: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
        },
        skills: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return Array.isArray(v) && v.length > 0;
                },
                message: "At least one skill is required",
            },
        },
    },
    {
        timestamps: true,
    }
);

const profileModel = mongoose.model("Profile", ProfileSchema);

export default profileModel;
