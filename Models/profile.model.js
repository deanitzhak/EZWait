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
        type: { type: Boolean }, /*true = admin , false = client*/
        createdAt: { type: Date, default: Date.now }, 
        cancelCount: { type: Number, default: 0 } 
    },
    {
        collection: "Profiles", 
    }
);
const profileModel = model("Profiles", profileSchema);
module.exports = profileModel;
