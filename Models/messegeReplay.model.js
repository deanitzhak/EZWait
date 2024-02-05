const {Schema, model} = require("mongoose");
const {validate} = require("uuid");

const futureEmailSchema = new Schema(
    {
        id: {type: String, index: 1},
        to: [{type: String}],
        cc: {type: String},
        bcc: {type: String},
        subject: {type: String},
        html: {type: String},
        from: {type: String},
        timeToSend: {type: String},
    },
    {
        collection: "emailsToSend",
    }
);
futureEmailSchema.path("id").validate((id) => validate(id));

const FutureEmail = model("emailToSend", futureEmailSchema);
module.exports = {FutureEmail};