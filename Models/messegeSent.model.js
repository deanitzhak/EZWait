const {Schema, model} = require("mongoose");

const emailsSentSchema = new Schema(
    {
        to: [{type: String}],
        cc: {type: String},
        bcc: {type: String},
        subject: {type: String},
        html: {type: String},
        from: {type: String},
        timeSent: {type: String},
    },
    {
        collection: "emailsSent",
    }
);

const emailSent = model("emailSent", emailsSentSchema);
module.exports = {emailSent};