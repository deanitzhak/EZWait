const mongoose = require('mongoose');
const clientModel = require('../models/client.model');

const EnumStatus = {
    VALUE1: 'active',
    VALUE2: 'block',
};

async function createNewClient(newClientJSON) {
    const clientId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for clientId
  
    const newClient = new clientModel({
        clientId: clientId,
        userName: newClientJSON.Client.userName,
        dateOfBirth: newClientJSON.Client.dateOfBirth,
        gender: newClientJSON.Client.gender,
        phone: newClientJSON.Client.phone,
        address: newClientJSON.Client.address,
        status: EnumStatus.VALUE1,
        subClient: {
            subfirstName: newClientJSON.Client.subfirstName,
            sublastName:newClientJSON.Client.sublastName,
            subgender:newClientJSON.Client.subgender,
            subdateOfBirth: newClientJSON.Client.subdateOfBirth,
   
        },
            
    });
    console.log("newClient -> ", newClient);
    console.log("newClient -> ", newClientJSON.subfirstName);
    return newClient;
}
module.exports = {
    createNewClient
};