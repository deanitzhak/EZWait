const { ObjectId } = require("mongodb");
const { Schema, model, ObjectId, isValidObjectId } = require("mongoose");

const appointmentSchema = new Schema(
  {
    appointmentId: {
      type: ObjectId,
      required: true,
      validate: [isValidObjectId, "appointmentId must be a valid id"],
    },
    userName: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    startTime: {
      type: Date,
      default: Date.now, // Use Date.now() as the default value for the current date and time
    },
    endTime: {
      type: Date,
      default: Date.now, // Use Date.now() as the default value for the current date and time
    },
    type: {
      type: String,
      enum: ["Meeting", "Appointment", "Other"],
      required: true,
    },
    state: {
      type: String,
      enum: ["Pending", "Confirmed", "Canceled"],
      required: true,
    },
    timeStamp: {
      type: Date,
      default: Date.now, // Use Date.now() as the default value for th current date and time
    },
  },
  {
    collection: "Appointment",
  }
);

const AppointmentModel = model("Appointment", appointmentSchema);
module.exports = AppointmentModel;
