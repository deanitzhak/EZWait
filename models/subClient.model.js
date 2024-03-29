const { Schema, model } = require("mongoose");

// Define the subclient schema
const subClientSchema = new Schema({
    subfirstName: { type: String, default: "" },
    sublastName: { type: String, default: "" },
    subgender: { type: String, default: "" },
    subdateOfBirth: { type: Date, default: Date.now }
});

// Create a Mongoose model for the subclient schema
const SubClientModel = model("SubClient", subClientSchema);

module.exports = SubClientModel;
