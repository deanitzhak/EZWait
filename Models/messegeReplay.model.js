const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

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
        collection: "replayMesseg",
    }
);
messegeReplaySchema.path("id").validate((id) => validate(id));

const messegeReplay = model("replayMesseg", messegeReplaySchema);
module.exports = {messegeReplay};