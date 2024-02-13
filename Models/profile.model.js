const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
    {
        userId: { type: ObjectId, index: 1 },
        userName: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        status: { type: Boolean },
        createdAt: { type: Date, default: Date.now }, // Set default value to current date
        cancelCount: { type: Number, default: 0 } // Set default value to 0
    },
    {
        collection: "profiles", // Corrected typo
    }
);

const profileModel = model("profiles", profileSchema);
module.exports = profileModel;
