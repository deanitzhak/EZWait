const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");

const appointmentSchema = new Schema(
    {
        id: {type: ObjectId, index: 1},
        userName: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        time: {type: Date},
       date: {type: Date},
        type: { type: String, enum: ['value1', 'value2', 'value3'] },
        status: { type: String, enum: ['Upcoming', 'Cancelled', 'Completed'] },
        timeStamp:{ type: Date}
    },
    {
        collection: "Appointment",
    }
);
const appointmentModel = model("Appointment", appointmentSchema);
module.exports = appointmentModel;

