const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {appointmentSchema} = require("../models/appointment.model"); 

const scheduleSchema = new Schema(
    {
        scheduleId:{ type: ObjectId, index: 1},
        day: { type: Number, index: 1 }, 
        month: { type: Number, index: 1 },
        year: { type: Number, index: 1 },
        workingHours: {
            type: {
                startTime: { type: String, default: '09:00:00' },
                endTime: { type: String, default: '18:00:00' }
            }
        },
        takenHours: {
            appointments: [{
                startApoointment: { type: Date },
                duration: { type: Number, index: 1 },
            }]
        }
    });
const scheduleModel = model("Schedule", scheduleSchema);
module.exports = scheduleModel;