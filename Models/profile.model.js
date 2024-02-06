const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

const profileSchema = new Schema(
    {
        userId: {type: ObjectId, index: 1},
        userName: [{type: String}],
        firstName: {type: String},
        lastName: {type: String},
        emait: {type: String},
        password: {type: String},
        status: {type: Boolean},
        createAt: {type: Date},
        canceleCount: {type: int}
    },
    {
        Collection: "Profile",
    }
);
profileSchema.path("id").validate((id) => validate(id));

const profileModel = model("Profile", profileSchema);
module.exports = {profileModel};