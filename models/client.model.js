const { Schema, model } = require("mongoose");

// Define the client schema
const clientSchema = new Schema(
    {
        clientId: { type: Schema.Types.ObjectId, index: true },
        userName: { type: String },
        dateOfBirth: { type: Date },
        gender: { type: String }, 
        phone: { type: String },
        address: { type: String },
        status: { type: String, enum: ['block', 'active'] },
        subClients: [{
            subfirstName: { type: String },
            sublastName: { type: String },       
            subgender: { type: String },    
            subdateOfBirth: { type: Date }
        }] // Array of embedded subclient schemas
    },
    { collection: "Client" }
);

const clientModel = model("Client", clientSchema);
module.exports = clientModel;
