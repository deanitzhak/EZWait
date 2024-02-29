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
        status: EnumStatus[newClientJSON.Client.status],
    });
    console.log("newClient -> ", newClient);
    console.log("newClient -> ", newClientJSON.Client.userName);
    return newClient;
}
module.exports = {
    createNewClient
};
