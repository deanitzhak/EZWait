const { ObjectId } = require("mongodb");
const { Schema, model, ObjectId, isValidObjectId } = require("mongoose");

const messegeSentSchema = new Schema(
  {
    messegeSentId: {
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
    collection: "MessegeSent",
  }
);

const MessegeSentModel = model("MessegeSent", messegeSentSchema);
module.exports = MessegeSentModel;
