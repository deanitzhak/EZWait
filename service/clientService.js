const clientModel = require('../models/client.model');


const EnumStatus = {
    VALUE1: 'block',
    VALUE2: 'active',
};

    
    async function createNewClient(newClientJSON) {
        switch (newClientJSON.client.type) {
            case "1":
                newClientJSON.client.type = "value1";
                break;
            case "2":
                newClientJSON.client.type = "value2";
                break;
    
        }

    const newClient = new clientModel({
        clientId: newClientJSON.client.clientId,
        userName: newClientJSON.client.userName,
        dateOfBirth: newClientJSON.client.dateOfBirth,
        gender: newClientJSON.client.gender,
        phone :newClientJSON.client.phone,
        address: newClientJSON.client.address,
        status :newClientJSON.client.status,
        status: EnumStatus.VALUE1,
        subClient : newClientJSON.client. subClient.firstName,
        subClient : newClientJSON.client. subClient.lastName,
        subClient : newClientJSON.client. subClient.dateOfBirth,
        subClient : newClientJSON.client. subClient.gender,
    });
    console.log(newClient);
    return newClient; 
}
module.exports = {
    createNewClient
};


