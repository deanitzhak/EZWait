const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
    {
        clientId: { type: ObjectId, index: true },
        userName: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String }, 
        phone: { type: String },
        address: { type: String },
        status: { type: String, enum: ['block', 'active'] },
        subClient: {
            subfirstName: { type: String },
            sublastName: { type: String },
            subgender: { type: String },
            subdateOfBirth: { type: Date }, 
        }
    },
    { collection: "Client" }
);

const clientModel = model("Client", clientSchema);
module.exports = clientModel;
