const { Schema, model, ObjectId, isValidObjectId } = require("mongoose");

const scheduleSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now.day,
    },
    month: {
      type: Date,
      default: Date.now.month,
    },
    year: {
      type: Date.now,
      default: Date.year,
    },
    time: {
      type: Date,
      default: Date.now,
    }
  },
  {
    collection: "Schedule",
  }
);

const scheduleSchemaModel = model("scheduleSchemaModel",scheduleSchema);
module.exports = scheduleSchemaModel;
