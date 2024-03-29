const MongoStorage = require('../db/mongo.storage');
class ClientRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateClientValue = this.updateClientValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.createNewClient = this.createNewClient.bind(this);
        this.updateClientData = this.updateClientData.bind(this);
    }
    async updateClientValue(clientId, key, value) {
        try {
            const client = await this.Model.findById(clientId);
            if (!client) {
                throw new Error('Client not found');
            }
            client[key] = value;
            const updatedClient = await client.save();
            return updatedClient;
        } catch (error) {
            throw new Error(`Error updating client value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const client = await this.findByAttribute('userName', userName);
            return client[0];
        } catch (error) {
            throw new Error(`Error retrieving clients by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const clients = await this.find();
            return clients;
        } catch (error) {
            throw new Error(`Error retrieving clients: ${error.message}`);
        }
    }
    async findOne(query) {
        try {
            const client = await this.Model.findOne(query);
            return client;
        } catch (error) {
            throw new Error(`Error retrieving client: ${error.message}`);
        }
    }

    async createNewClient(clientData) {
        try {
            const newClient = await this.Model.create(clientData);
            return newClient;
        } catch (error) {
            throw new Error(`Error creating appointment: ${error.message}`);
        }
    }
    async updateClientData(myClient) {
        try {
            const clientId = myClient.clientId;
            const client = await this.Model.findOne({ clientId: clientId });
            if (!client) {
                throw new Error('Client not found');
            }
            
            // Update client properties
            client.gender = myClient.gender;
            client.phone = myClient.phone;
            client.address = myClient.address;
            client.dateOfBirth = myClient.dateOfBirth;
            await client.save();
        } catch (error) {
            console.error('Error updating client data:', error);
            throw error;
        }
    }
 }
module.exports = ClientRepository;
