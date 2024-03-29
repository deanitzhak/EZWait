const mongoose = require('mongoose');
const clientModel = require('../models/client.model');
const subClientModel = require('../models/subClient.model');
const cliRepp = require('../repository/client.repository');
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
    return newClient;
}
async function SignUpcreateNewClient(newClientJSON) {
    const clientId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for clientId
    const newClient = new clientModel({
        clientId: clientId,
        userName: newClientJSON.userName,
        dateOfBirth: Date.now(),
        gender: "Them",
        phone: "00",
        address: "00",
        status: EnumStatus.VALUE1,            
    });
    return newClient;
}
async function createNewSubClient(newClientJSON) {
    const subClient = new subClientModel({
        subfirstName: newClientJSON.subfirstName,
        sublastName: newClientJSON.sublastName,
        subgender: newClientJSON.subgender,
        subdateOfBirth: newClientJSON.subdateOfBirth
    });
    console.log(subClient);
    return subClient;
}
async function  createUpdateClientData(newClientJSON)
{
        const sampleDataSubClient = newClientJSON.subClients;
        const newClient = new clientModel({
        clientId: newClientJSON.clientId,
        userName: newClientJSON.userName,
        dateOfBirth: newClientJSON.dateOfBirth,
        gender: newClientJSON.gender,
        phone: newClientJSON.phone,
        address: newClientJSON.address,
        status: EnumStatus.VALUE1,
        subClients: sampleDataSubClient
    });
    return newClient;
}
module.exports = {
    createNewClient,
    SignUpcreateNewClient,
    createNewSubClient,
    createUpdateClientData
};