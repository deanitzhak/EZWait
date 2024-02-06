const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

const scheduleSchema = new Schema(
    {
        day: {type: date, index: 1},
        month: {type: date, index: 1},
        years: {type: date, index: 1},
        time: {type: date, index: 1}
    },
    {
        collection: "Schedule",
    }
);
scheduleSchema.path("id").validate((id) => validate(id));

const ScheduleModel = model("Schedule", scheduleSchema);
module.exports = {ScheduleModel};