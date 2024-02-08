const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

const appointmentSchema = new Schema(
    {
        id: {type: ObjectId, index: 1},
        userName: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        startTime: {type: Date},
        endTime: {type: Date},
        type: { type: String, enum: ['value1', 'value2', 'value3'] },
        status: { type: String, enum: ['value1', 'value2', 'value3'] },
        timeStamp:{ type: Date}
    },
    {
        collection: "Appointment",
    }
);
appointmentSchema.path("id").validate((id) => validate(id));

const appointmentModel = model("Appointment", appointmentSchema);
module.exports = {appointmentModel};