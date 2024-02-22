const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const messegeReplaySchema = new Schema(
    {
        replayMessegId: {type: ObjectId, index: 1},
        userId: {type: ObjectId, index: 1},
        clientId: {type: ObjectId, index: 1},
        username: {type: String},
        subject: {type: String},
        description: {type: String},
        sendTime: { type: Date}
    },
    {
        collection: "MessegeReplay",
    }
);
const messegeReplayModel = model("ReplayMesseg", messegeReplaySchema);
module.exports = messegeReplayModel;