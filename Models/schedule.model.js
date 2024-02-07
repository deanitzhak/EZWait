//const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
//const {validate} = require("uuid");

const scheduleSchema = new Schema(
    {
        day: { type: Number, index: 1 }, // Use 'Number' instead of 'Date'
        month: { type: Number, index: 1 },
        year: { type: Number, index: 1 },
        time: { type: Date, index: 1 }    
    },
    {
        collection: "Schedule",
    }
);
//scheduleSchema.path("id").validate((id) => validate(id));

const scheduleModel = model("Schedule", scheduleSchema);
module.exports = {scheduleModel};