const { ObjectId } = require("mongodb");
const { Schema, model, ObjectId, isValidObjectId } = require("mongoose");

const messegeReplay = new Schema(
  {
    messegeReplayId: {
      type: ObjectId,
      required: true,
      validate: [isValidObjectId, "Not valid messege Sent Id must be a valid id"],
    },
    userId: {
        type: ObjectId,
        required: true,
        validate: [isValidObjectId, "Not valid user Id must be a valid id"],
    },
    cilentId: {
        type: ObjectId,
        required: true,
        validate: [isValidObjectId, "Not valid client Id must be a valid id"],
    },
    userName: {
      type: String,
      default: null,
    },
    subject: {
      type: String,
      default: null, // Use Date.now() as the default value for the current date and time
    },
    description: {
      type: String,
      default: null, // Use Date.now() as the default value for the current date and time
    },
    sendTime: {
      type: Date,
      required: Date.now,
    },
  },
  {
    collection: "MessegeReplay",
  }
);

const MessegeReplayModel = model("MessegeSent", messegeReplay);
module.exports = MessegeReplayModel;
