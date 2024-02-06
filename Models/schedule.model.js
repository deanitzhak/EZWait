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
        collection: "schedule",
    }
);
scheduleSchema.path("id").validate((id) => validate(id));

const messegeReplay = model("schedule", scheduleSchema);
module.exports = {schedule};
