const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");

const appointmentSchema = new Schema(
    {
        appointmentId: {type: ObjectId, index: 1},
        userName: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        type: { type: String, enum: ['value1', 'value2', 'value3'] },
        status: { type: String, enum: ['Upcoming', 'Cancelled', 'Completed'] },
        date: {type: Date},
        startTime: {type: Date},
        duration: {type: Number},
        timeStamp:{ type: Date}
    },
    {
        collection: "Appointment",
    }
);
const appointmentModel = model("Appointment", appointmentSchema);
module.exports = appointmentModel;

