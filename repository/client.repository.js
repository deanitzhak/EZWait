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

    }
    async updateClientValue(clientId, key, value) {
        try {
            const client = await this.Model.findById(clientId);
            if (!client) {
                throw new Error('Client not found');
            }
            client[key] = value;
            const updatedClient = await client.save();
            return updatedclient;
        } catch (error) {
            throw new Error(`Error updating client value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const client = await this.findByAttribute('userName', userName);
            return client;
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

    async createNewProfile(clientData) {
        try {
            const newClient = await this.Model.create(clientData);
            return newClient;
        } catch (error) {
            throw new Error(`Error creating appointment: ${error.message}`);
        }
    }    
}
module.exports = ClientRepository;