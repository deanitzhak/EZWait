const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");

const profileSchema = new Schema(
    {
        userId: { type: ObjectId, index: 1 },
        userName: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        status: { type: Boolean },
        createdAt: { type: Date }, // Ensure createdAt is defined in your schema
        cancelCount: { type: Number } // Ensure cancelCount is defined in your schema    
    },
    {
        Collection: "Profile",
    }
);
//profileSchema.path("id").validate((id) => validate(id));

const profileModel = model("Profile", profileSchema);
module.exports = {profileModel};
