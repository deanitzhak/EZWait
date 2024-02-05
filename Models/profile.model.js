const { ObjectId } = require("mongodb");
const { Schema, model, ObjectId, isValidObjectId } = require("mongoose");

const profileSchema = new Schema(
  {
    clientId: {
      type: ObjectId,
      required: true,
      validate: [isValidObjectId, "Profile must be a valid id"],

    },
    userName: {
      type: String,
      default: null
    },
    firstNme: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    type: {
        type: Boolean,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },canceleCount: {
        type: int,
        default: -1,
    }
  },
  {
    collection: "Profile",
  }
);
const profileSchemaModle = model("Profile",profileSchema);
module.exports = profileSchemaModle;
