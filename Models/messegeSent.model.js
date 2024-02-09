const { ObjectId } = require("mongodb");
const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

const messegeSentSchema = new Schema(
    {
        sendMessegId: {type: ObjectId, index: 1},
        userId: {type: ObjectId, index: 1},
        clientId: {type: ObjectId, index: 1},
        username: {type: String},
        subject: {type: String},
        description: {type: String},
        sendTime: {type: Date}
    },
    {
        collection: "MessegeSent",
    }
);
//messegeSentSchema.path("id").validate((id) => validate(id));

const messegeSentModel = model("SendMesseg", messegeSentSchema);
module.exports = {messegeSentModel};