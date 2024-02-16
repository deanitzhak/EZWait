const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");

const scheduleSchema = new Schema(
    {
        scheduleId:{ type: ObjectId, index: 1},
        day: { type: Number, index: 1 }, 
        month: { type: Number, index: 1 },
        year: { type: Number, index: 1 },
        time: { type: Date, index: 1 }    
    },
    {
        collection: "Schedule",
    }
);

const scheduleModel = model("Schedule", scheduleSchema);
module.exports = scheduleModel;